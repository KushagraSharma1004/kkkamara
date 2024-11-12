import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import './main'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CountryPicker from 'react-native-country-picker-modal';
const ForgotPassword = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const router = useRouter();
    const [isOTPVisible, setIsOTPVisible] = useState(false);
    const [isSendOTPVisible, setIsSendOTPVisible] = useState(true);
    const [isSendOTPVisible2, setIsSendOTPVisible2] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
    const [countryCode, setCountryCode] = useState('IN'); // Default country code
  const [callingCode, setCallingCode] = useState('+91'); // Default calling code
  const fullPhoneNumber = callingCode + phoneNumber

  const goToSignUp = () => {
    router.push('./SignUp');
  };
    const createNewPassword = () => {
      
      router.push(`./CreateNewPassword?mobileNumber=${fullPhoneNumber}`);
    }
  const showOTPInput = () => {
      setIsOTPVisible(!isOTPVisible);
      setIsSendOTPVisible(!isSendOTPVisible);
      setIsSendOTPVisible2(!isSendOTPVisible2);
  }

  

  const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
          setConfirm(confirmation);
          console.log(confirmation)
          showOTPInput()
        } catch (error) {
            console.log("Error Sending Code: ", error);
        }
    };


  const confirmCode = async () => {
        try {
            const useCredential = await confirm.confirm(code);
            const user = useCredential.user;

            // Check if the user is new or existing
            const userDocument = await firestore()
                .collection("users")
                .doc(fullPhoneNumber)
                .get();
            
            if (userDocument.exists) {
                // User is existing, navigating to Dashboard
                createNewPassword()
            } else {
                // User is new, navigate to Details
                Alert.alert('This Number is not registered!')
            }
        } catch (error) {
            console.log("Invalid code.", error)
        }
    };
  return (
    <View>
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: screenHeight, width: screenWidth, gap: 10, alignItems: 'center'}} >
              
        <Text style={{ fontSize: 18, width: screenWidth - 100 }} >Reset Password</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 3, borderRadius: 7, width:screenWidth-100, paddingLeft:10 }}>
            <CountryPicker
              withFlag
              withCallingCode
              countryCode={countryCode}
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(`+${country.callingCode}`);
              }}
          />
          <Text>{ callingCode}</Text>
          <TextInput keyboardType={'numeric'} maxLength={10} value={phoneNumber} onChangeText={setPhoneNumber} placeholder='Mobile Number' style={{ height: 45, width: screenWidth - 175, padding: 10, borderRadius: 7, outlineStyle:'none' }}></TextInput>
        </View>
        {
          isOTPVisible && (
        <TextInput value={code} onChangeText={setCode} placeholder='Enter OTP' style={{height:50, width:screenWidth-100, borderWidth:3, padding:10, borderRadius:7}}></TextInput>
        )
        }
        {
          isSendOTPVisible && (<TouchableOpacity onPress={signInWithPhoneNumber} style={{ width: screenWidth - 100, borderWidth: 3, borderRadius: 7, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', display: 'flex' }}>
                  <Text style={{fontSize:16, color:'white'}} >Send OTP</Text>
          </TouchableOpacity>)
        }

        {
          isSendOTPVisible2 && (<TouchableOpacity onPress={confirmCode} style={{ width: screenWidth - 100, borderWidth: 3, borderRadius: 7, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', display: 'flex' }}>
                  <Text style={{fontSize:16, color:'white'}} >Submit</Text>
          </TouchableOpacity>)
        }

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-evenly', alignItems:'flex-end', width:screenWidth-100 }} >
                  
              <TouchableOpacity style={{width:screenWidth -100,}}>
                <Text style={{textAlign:'right', fontSize:14, color:'blue'}} >Resend OTP</Text>
                 </TouchableOpacity>
                  
              </View>

              </View>
      </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})