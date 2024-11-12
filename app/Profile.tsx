import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Alert, Linking, TouchableOpacity, Clipboard, ToastAndroid, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import your Firebase configuration
import BottomNavBar from './BottomNavBar';
import './main'
import { useRoute } from '@react-navigation/native';
const Profile = () => {
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
  const fetchUserData = async () => {
    // if (!mobileNumber) {
    //   Alert.alert('Error', 'Mobile number is not available');
    //   setLoading(false);
    //   return;
    // }

    try {
      const userDoc = doc(db, 'users', fullMobileNumber);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        
        if (typeof data.name !== 'string') {
          console.error('Expected name to be a string, but got:', data.name);
        }

        setUserData(data);
      } else {
        Alert.alert('Error', 'No user found with this mobile number');
      }
    } catch (error) {
      // console.error('Error fetching user data:', error);
      // Alert.alert('Error', 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, [fullMobileNumber]); // Runs when fullMobileNumber changes
 // Runs when fullMobileNumber changes

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  const copyToClipboard = () => {
    Clipboard.setString(`${userData.selfReferralCode}`);
    ToastAndroid.show("Referral code Copied", ToastAndroid.LONG);
  };
  

  return (
    <View style={{ height: '100%', width: '100%', gap: 15, }}>
      <SafeAreaView style={{ marginTop: 32, height: '100%', width: '100%', gap: 15, backgroundColor: '#f8f9fa', padding:15 }}>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 10 }} >
          <Image style={{height:35, width:35}} source={require('../assets/images/profileImage.jpg')}/>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Profile</Text>
      </View>
      {userData ? (
          <View style={{}}>
            <View style={{backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0,},}} >
              <Text style={{}}>Name: {userData.name || 'No Name'}</Text>
            </View>
            <View style={{backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0,},}} >
              <Text style={{}}>Mobile Number: {userData.fullMobileNumber}</Text>
            </View>
            <View style={{backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0,},}} >
              <Text style={{}}>Address: {userData.address}</Text>
            </View>
            <View style={{backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0,},}} >
              <Text style={{}}>Email: {userData.email}</Text>
            </View>
            <View style={{backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0,},}} >
              <Text style={{}}>Instagram Id: {userData.instagramId}</Text>
            </View>
            <View style={{backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0,},}} >
              <Text style={{}}>Facebook Id: {userData.facebookId}</Text>
            </View>

              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#ffffff', borderRadius: 10,padding: 10,marginVertical: 5,elevation: 3, shadowColor: '#000',shadowOpacity: 0.2,shadowRadius: 5,shadowOffset: {height: 2,width: 0} }} >
              <View>
                <Text style={{}}>Referral Code: {userData.selfReferralCode}</Text>
              </View>
          <TouchableOpacity onPress={copyToClipboard} style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center', borderWidth:0.5, width:40, borderRadius:3, justifyContent:'center', backgroundColor:'black', height:20,marginTop:3}} >
            <Text style={{fontSize:13, color:'white', marginTop:-3}} >Copy</Text>
                </TouchableOpacity>
              </View>

          {/* Add more fields as needed */}
          {/* Be cautious about displaying sensitive information */}
        </View>
      ) : (
        <Text style={{}}>No user data available.</Text>
        )}
      </SafeAreaView>
      <BottomNavBar mobileNumber={fullMobileNumber}/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
