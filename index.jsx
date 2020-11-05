import React,{useEffect, useState} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import LoginStyles from './Loginstyles';
import { useNavigation } from '@react-navigation/native';
import { Zocial } from '@expo/vector-icons';
import colors from '../config/colors';
import "firebase/firestore";
import firebase from "firebase";
import * as GoogleSignIn from 'expo-google-sign-in';

export default function SignGmail()
{

    useEffect(()=>{
        initAsync();
    },[])
    const [user,setuser]=useState({});
    const navigation = useNavigation();
    
    const initAsync = async () => {
        await GoogleSignIn.initAsync();
        syncUserWithStateAsync();
      };

      const syncUserWithStateAsync = async () => {
        const u = await GoogleSignIn.signInSilentlyAsync();
        setuser({ u });
        navigation.navigate("Home",{user:user})
      };

      const signInAsync = async () => {
        try {
          await GoogleSignIn.askForPlayServicesAsync();
          const { type, user } = await GoogleSignIn.signInAsync();
          if (type === 'success') {
            syncUserWithStateAsync();
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
      };

    return(
        <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity onPress={()=> signInAsync()}>
        
        <View style={LoginStyles.gmailbutton}>
        
        <View style={{flex:0.2, right:5}}>
        <Image source={require('../../assets/images/google.png')} style={{height:30, width:30}}/>
        </View>

        <View style={{flex:0.8}}>
        <Text style={{fontFamily:"Open-Sans-Bold", color:colors.coolblack}}>
        CONTINUE WITH GOOGLE
        </Text>
        </View>

        </View>
        </TouchableOpacity>
        </View>
    )
}
