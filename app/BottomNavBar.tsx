import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
// import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { useRouter } from 'expo-router';
import Menu from './Menu';
import './main'
const BottomNavBar = ({ mobileNumber }) => {
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
    const ScreenHeight = Dimensions.get('window').height;
    const ScreenWidth = Dimensions.get('window').width;
  const router = useRouter();
  // console.log(mobileNumber)
   
  const bottomMenuImageHeight = 45;
  const bottomMenuImageWidth = 45;
  const [isMenuVisible, setIsMenuVisible] = useState(false);  // Use boolean for visibility

  const goToHome = () => {
    router.push(`/Home?mobileNumber=${fullMobileNumber}`);
  };
  const goToWallet = () => {
    router.push(`/Wallet?mobileNumber=${fullMobileNumber}`);
  };
  const goToReferral = () => {
    router.push(`/Referral?mobileNumber=${fullMobileNumber}`);
  };

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(prevState => !prevState);  // Toggle visibility
  };

  return (
    <View style={{position:'absolute', bottom:0}} >
      <View style={{}}>
        {/* Bottom Navigation Bar */}
        <View
          style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',position: 'absolute',bottom: 0,width: ScreenWidth,height: 60,elevation: 1, backgroundColor:'white'}}
        >
          <TouchableOpacity onPress={goToHome}>
            <Image
              style={{ height: 35, width: 35 }}
              source={require('../assets/images/home.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToWallet}>
            <Image
              style={{ height: 50, width: 50 }}
              source={require('../assets/images/walletImage.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToReferral}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require('../assets/images/referralLogo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Image
              style={{ height: bottomMenuImageHeight, width: bottomMenuImageWidth }}
              source={require('../assets/images/menuImage.png')}
            />
          </TouchableOpacity>
        </View>

        
        <Menu
          mobileNumber={fullMobileNumber}
          isVisible={isMenuVisible}
          toggleMenu={toggleMenu}  // Pass the toggleMenu function
          style={{height: 400,width: 250,marginBottom: 65,marginLeft: ScreenWidth-250,borderRadius: 10,borderWidth: 1,padding: 10,flexDirection: 'column',gap: 10,}}
        />
      </View>
    </View>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({});
