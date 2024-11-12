import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { collection, doc, setDoc, getDoc, query, where,getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
const OTPConfirmation = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
    const router = useRouter();
    const route = useRoute();
  const phoneNumber = route.params?.fullMobileNumber;
  const mobileNumber = route.params?.mobileNumber;
  const name = route.params?.name;
  const password = route.params?.password;
  const email = route.params?.email;
  const referralCode = route.params?.referralCode;
  const address = route.params?.address;
  const instagramId = route.params?.instagramId;
  const facebookId = route.params?.facebookId;
  const selfReferralCode = route.params?.selfReferralCode;

  const fullMobileNumber = '+' + phoneNumber.replace(/\s+/g, '');
    const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [isOTPSent, setIsOTPSent] = useState(false)
  const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(fullMobileNumber);
          setConfirm(confirmation);
          setIsOTPSent(true)
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
            .doc(fullMobileNumber)
            .get();
        
        if (userDocument.exists) {
            router.push(`./`);
        } else {
            // Check if the referral code exists in any user's document
            const referralQuery = query(collection(db, 'users'), where('selfReferralCode', '==', referralCode));
            const referralSnapshot = await getDocs(referralQuery);

            const userDoc = doc(db, 'users', fullMobileNumber);

            // Make sure none of these values are undefined
            const userData = {
                fullMobileNumber: fullMobileNumber || '',
                name: name || '',  // Provide a default value in case it's undefined
                password: password || '',
                referralCode: referralCode || '',
                address: address || '',
                email: email || '',
                instagramId: instagramId || '',
                facebookId: facebookId || '',
                selfReferralCode: selfReferralCode || ''
            };
        
            if (!referralSnapshot.empty) {
                const referralUserDoc = referralSnapshot.docs[0]; // Get the first matching document
                
                await setDoc(userDoc, userData); // Use userData instead of passing fields directly
                
                if (referralCode !== '') { 
                    const myReferredCollection = collection(referralUserDoc.ref, 'myReferred');
                    await setDoc(doc(myReferredCollection, mobileNumber), {
                        name: name || '',  // Provide default value
                        mobileNumber: mobileNumber || ''
                    });
                }
                router.push(`./OTPConfirmation?mobileNumber=${fullMobileNumber}`); 
            } else {
                await setDoc(userDoc, userData); // Use userData to ensure no undefined values
            }

            router.push(`./Home?mobileNumber=${fullMobileNumber}`); 
        }
    } catch (error) {
        console.log("Invalid code.", error);
    }
};

  return (
    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: screenHeight, width: screenWidth, gap: 10, alignItems: 'center' }} >
          <TextInput value={fullMobileNumber} style={{width:screenWidth-100, borderWidth:3, borderColor:'black', borderRadius:7, height:50, padding: 10}} ></TextInput>
      {
        isOTPSent && (
          <TextInput keyboardType={'numeric'} value={code} onChangeText={setCode} placeholder='Enter OTP' style={{ width: screenWidth - 100, borderWidth: 3, borderColor: 'black', borderRadius: 7, height: 50, padding:10 }} ></TextInput>
        )
      }
      {
        !isOTPSent && (
          <TouchableOpacity onPress={signInWithPhoneNumber} style={{display: 'flex', alignItems:'center', justifyContent:'center', backgroundColor:'black', width:screenWidth-100, height:50, borderRadius: 7}} >
              <Text style={{color:'white', fontSize:15}} >Send OTP</Text>
          </TouchableOpacity>
        )
      }
      {
        isOTPSent && (
          <TouchableOpacity
            onPress={confirmCode}
          style={{ width: screenWidth - 100, borderWidth: 3, borderRadius: 7, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', display: 'flex' }}
        >
          <Text style={{ fontSize: 16, color: 'white' }}>Confirm</Text>
          </TouchableOpacity>
        )
      }

      
      
    </View>
  )
}

export default OTPConfirmation

const styles = StyleSheet.create({})