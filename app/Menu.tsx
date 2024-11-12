import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import './main'
const Menu = ({ style, isVisible, toggleMenu, mobileNumber }) => {
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  // console.log(mobileNumber)
  const router = useRouter()
  const goToHome = () => {  
    router.push(`/Home?mobileNumber=${fullMobileNumber}`);
  };
  const goToWallet = () => {
    router.push(`/Wallet?mobileNumber=${fullMobileNumber}`);
  };
  const goToReferral = () => {
    router.push(`/Referral?mobileNumber=${fullMobileNumber}`);
  };
  const goToProfile = () => {
    router.push(`/Profile?mobileNumber=${fullMobileNumber}`);
    // console.log(mobileNumber)
  };

  const goToVenderRegistration = () => {
    router.push(`/VenderRegistration?mobileNumber=${fullMobileNumber}`);
  }
//   const goToSettings = () => {
//     router.push(`/Settings?mobileNumber=${mobileNumber}`);
//   };
  const goToLogin = () => {
    router.push('./');

  }

  return (
    // Toggle display based on isVisible prop
    <View style={[style, { display: isVisible ? 'flex' : 'none', backgroundColor:'white', zIndex:10000 }]}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16 }}>Menu</Text>
        {/* On pressing the crossImage, toggle the menu visibility */}
        <TouchableOpacity onPress={toggleMenu}>
          <Image style={{ height: 20, width: 20 }} source={require('../assets/images/crossImage.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, borderWidth: 1 }}></View>

      <TouchableOpacity onPress={goToHome} >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image style={{ height: 25, width: 25 }} source={require('../assets/images/home.png')} />
        <Text>Home</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={goToProfile} >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image style={{ height: 25, width: 25 }} source={require('../assets/images/profileImage.jpg')} />
        <Text>Profile</Text>
      </View>
</TouchableOpacity>

      <TouchableOpacity onPress={goToWallet} >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image style={{ height: 25, width: 25 }} source={require('../assets/images/walletImage.png')} />
        <Text>Wallet</Text>
      </View>
</TouchableOpacity>

      <TouchableOpacity onPress={goToReferral} >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image style={{ height: 25, width: 25 }} source={require('../assets/images/referralLogo.png')} />
        <Text>My Referrals</Text>
        </View>
      </TouchableOpacity>

       <TouchableOpacity onPress={goToVenderRegistration}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image style={{ height: 25, width: 25 }} source={require('../assets/images/localVendorsImage.png')} />
        <Text>Vendor registration</Text>
      </View>
      </TouchableOpacity> 

      <TouchableOpacity onPress={goToLogin} >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image style={{ height: 21.5, width: 22.2 }} source={require('../assets/images/logoutImage.png')} />
        <Text>Logout</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
