import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Linking, TouchableOpacity, Image, ScrollView } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Games = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [userData, setUserData] = useState(null);
  const typingSpeed = 100; // Typing speed in milliseconds
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  const Group4Width = 73;
  const Group3Width = 105;
  const Group2Width = 170;
  const Group1Width = 365;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!fullMobileNumber) {
        Alert.alert('Error', 'Mobile number is not available');
        return;
      }

      try {
        const userDoc = doc(db, 'users', fullMobileNumber);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setUserData(data);
        } else {
          Alert.alert('Error', 'No user found with this mobile number');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [fullMobileNumber]);

    useEffect(() => {
        setDisplayedText('')
        setDisplayedText2('')
    // Check if user data is available before starting typing effect
    if (!userData) return;

    const fullText = `Welcome, ${userData.name + "!" || 'No name'}`;
    const fullText2 = '  World of GAMES  '
   
    

    // Typing effect
    let index = 0;
    let index2 = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
          setDisplayedText((prev) => prev + fullText[index]);
          index++;
      } else {
          
        if (index2 < fullText2.length) {
            setDisplayedText2((prev) => prev + fullText2[index2]);
            index2++;
        } else {
        clearInterval(typingInterval);
      }
      }
        
    }, typingSpeed);

    // Cleanup function
    return () => {
      clearInterval(typingInterval);
    };
  }, [userData]);

    const goToMyBeat = () => {
        Linking.openURL(`https://kushagrasharma1004.github.io/myBeat/index.html?mobileNumber=${fullMobileNumber}`);
    }
    const goToLudo2Player = () => {
        Linking.openURL(`https://kushagrasharma1004.github.io/ludo2Player/index.html?mobileNumber=${fullMobileNumber}`);
    }

  const goToZtype = () => {
    Linking.openURL(`https://zty.pe`);
  }

  const goToCyberCarPunkRacing = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/cyberCarsPunkRacing.html')
  }

  const goToRagdollArchers = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/ragdollArchers.html')
  }

  const goToKourIo = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/kourIo.html')
  }

  const goToRallyRacerDirt = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/rallyRacerDirt.html')
  }

  const goToTurboStarsRivalRacing = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/turboStarsRivalRacing.html')
  }

  const goToDeathCityZombieInvasionLiq = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/deathCityZombieInvasionLiq.html')
  }

  const goToWorldGuessr = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/worldGuessr.html')
  }

  const goToFunnyShooter2 = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/funnyShooter2.html')
  }

  const goToDiepIo = () => {
    Linking.openURL('https://kushagrasharma1004.github.io/GuiniPigAllGames/diepIo.html')
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      
          <View style={{ display:'flex', alignItems:'center', marginTop:10}}>
              <Text style={{ fontSize: 16 }}>{displayedText}</Text>
            <View style={{backgroundColor:'black', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}} >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color:'white' }}>{displayedText2}</Text>
              </View>
          </View>
<ScrollView style={{marginTop:5, maxHeight:620, borderWidth:1}} >
          <View style={{ display: 'flex', flexWrap: 'wrap', marginTop:10, gap:10, justifyContent:'space-evenly', flexDirection:'row' }} >

            <TouchableOpacity onPress={goToMyBeat} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group4Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={require('../assets/images/gameController.jpg')} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >My Beat</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goToLudo2Player} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group4Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:40}} source={require('../assets/images/ludoImage.jpg')} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Ludo 2 Player</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={goToZtype} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group4Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:40}} source={require('../assets/images/ztypeImage.jpg')} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Ztype</Text>
                  </TouchableOpacity>

          <TouchableOpacity onPress={goToCyberCarPunkRacing} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group4Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:60}} source={require('../assets/images/cyberPunkCarRacingImage.jpg')} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Car Racing</Text>
                  </TouchableOpacity>

            <TouchableOpacity onPress={goToRagdollArchers} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group3Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/ragdoll-archers_16x9/20240205020743/ragdoll-archers_16x9-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Ragdoll Archers</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goToKourIo} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group3Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/kour-io_16x9/20241007075841/kour-io_16x9-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Kour Io</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={goToRallyRacerDirt} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group3Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/rally-racer-dirt_16x9/20240514035838/rally-racer-dirt_16x9-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Rally Racer Dirt</Text>
                  </TouchableOpacity>

          <TouchableOpacity onPress={goToTurboStarsRivalRacing} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group2Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/turbo-stars---rival-racing/20230620162017/turbo-stars---rival-racing-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Turbo Stars Rival Racing</Text>
                  </TouchableOpacity>
          
        <TouchableOpacity onPress={goToWorldGuessr} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group2Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/worldguessr_16x9/20241018082520/worldguessr_16x9-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >World Guessr</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={goToDeathCityZombieInvasionLiq} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group1Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/death-city-zombie-invasion-liq_16x9/20241017024657/death-city-zombie-invasion-liq_16x9-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >City Zombie Invasion Liq</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToFunnyShooter2} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group2Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/funny-shooter-2/20220823175815/funny-shooter-2-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Funny Shooter 2</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToDiepIo} style={{display:'flex', flexDirection:'column', borderWidth:1, width:Group2Width, height:70, alignItems:'center', justifyContent:'center', borderRadius:10}} >
            <Image style={{height:40, width:70}} source={{uri: 'https://images.crazygames.com/diepio/20230629173952/diepio-cover?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461'}} ></Image>
            <Text style={{fontSize:9, fontWeight:'bold'}} >Diep Io</Text>
          </TouchableOpacity>
        
    </View>

          
</ScrollView>
          <BottomNavBar mobileNumber={fullMobileNumber} />
          

    </SafeAreaView>
  );
};

export default Games;

const styles = StyleSheet.create({});
