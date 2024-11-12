import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import './main';

const CreateNewPassword = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const router = useRouter();
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  console.log(fullMobileNumber)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goToLogin = () => {
    router.push('./');
  };

  const updatePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        // Update password in Firestore based on the mobile number
        await firestore()
          .collection('users')
          .doc(fullMobileNumber) // Use mobile number as document ID
          .update({ password: newPassword });

        Alert.alert('Success', 'Password updated successfully!');
        goToLogin();
      } catch (error) {
        console.log("Error updating password: ", error);
        Alert.alert('Error', 'Failed to update password. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
    }
  };

  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: screenHeight, width: screenWidth, gap: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, width: screenWidth - 100 }}>Create New Password</Text>
        <TextInput
          placeholder='New Password'
          value={newPassword}
          onChangeText={setNewPassword}
          style={{ height: 50, width: screenWidth - 100, borderWidth: 3, padding: 10, borderRadius: 7 }}
          secureTextEntry={true}
        />
        <TextInput
          placeholder='Re-Enter New Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ height: 50, width: screenWidth - 100, borderWidth: 3, padding: 10, borderRadius: 7 }}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={updatePassword} style={{ width: screenWidth - 100, borderWidth: 3, borderRadius: 7, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', display: 'flex' }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({});
