import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList, Alert, StatusBar, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import BottomNavBar from './BottomNavBar'
import { useRoute } from '@react-navigation/native'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app, db } from './firebaseConfig'; // Ensure your Firebase app is initialized here
import MyBeatScoreHistory from './MyBeatScoreHistory'
import MyBeat2ScoreHistory from './MyBeat2ScoreHistory'
import RechargeOptions from './RechargeOptions'
import { updateDoc, collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
const Wallet = () => {
  const ScreenHeight = Dimensions.get('window').height
  const ScreenWidth = Dimensions.get('window').width
  const [referralAmount, setReferralAmount] = useState('0.00');  // State to hold referralAmount
  const [Coins, setCoins] = useState(0);
  const [rechargeBalance, setrechargeBalance] = useState('0.00');
  const [MyBeatScore, setMyBeatScore] = useState(0);
  const [MyBeat2Score, setMyBeat2Score] = useState(0);
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  const [referralBackgroundColor, setReferralBackgroundColor] = useState('#ccc')
  const [coinsBackgroundColor, setCoinsBackgroundColor] = useState('white')
  const [rechargeBackgroundColor, setRechargeBackgroundColor] = useState('white')
  const [myBeatScoreHistory, setMyBeatScoreHistory] = useState(false)
  const [myBeat2ScoreHistory, setMyBeat2ScoreHistory] = useState(false)
  const [rechargeOptionsVisible, setRechargeOptionsVisible] = useState(false)
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [updatedRechargeBalance, setUpdatedRechargeBalance] = useState('0.00')
  const [referralHistory, setReferralHistory] = useState([]);
  
  const renderItem = ({ item }) => {
  const isExpired = new Date() > item.expiryDate.toDate();
   // Calculate on render
  let divide = item.amount / item.duration
  let minus = item.expiryDate.toDate() - new Date()  
  const expiryDate = item.expiryDate.toDate();
  const currentDate = new Date();
  const differenceInTime = expiryDate - currentDate ; // Difference in milliseconds
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert to days

  let multiply = divide * differenceInDays

  setUpdatedRechargeBalance(parseFloat(multiply).toFixed(2))
  setrechargeBalance(parseFloat(multiply).toFixed(2))
  
  return (
    <View style={{
      padding: 10,
      borderWidth: 1,
      borderColor: item.isActive ? 'green' : 'red', // Green border for active recharge
      borderRadius: 5,
      marginBottom: 5,
    }}>
    
      <Text style={{ fontSize: 16 }}>Amount: ₹{item.amount}</Text>
      {/* <Text style={{ fontSize: 16 }}>divide: ₹{divide}</Text>
      <Text style={{ fontSize: 16 }}>minus: ₹{differenceInDays}</Text>
      <Text style={{ fontSize: 16 }}>multiply: ₹{multiply}</Text> */}
      <Text style={{ fontSize: 16 }}>Duration: {item.duration} Days</Text>
      <Text style={{ fontSize: 16 }}>Expiry Date: {formatDateTime(item.expiryDate)}</Text>
      <Text style={{ fontSize: 16 }}>Recharge Date: {formatDateTime(item.createdAt)}</Text>

      {/* Conditionally render Time Remaining or hide if expired */}
      {getRemainingTime(item.expiryDate, item) && (
        <Text style={{ fontSize: 16 }}>Time Remaining: {getRemainingTime(item.expiryDate, item)}</Text>
      )}

      {/* Show prorated referral balance */}
      {/* <Text style={{ fontSize: 16 }}>Prorated Referral Balance: ₹{proratedReferralBalance.toFixed(2)}</Text> */}

      {/* Display Status as Expired if isExpired is true */}
      <Text style={{ fontSize: 16, color: isExpired ? 'red' : 'green' }}>
        Status: {isExpired ? 'Expired' : 'Active'}
      </Text>
    </View>
    
  );
};
  const fetchReferralAmount = async (fullMobileNumber) => {
    try {
      const db = getFirestore(app);
      const docRef = doc(db, 'users', fullMobileNumber); // Assuming your Firestore structure has a collection 'users' with mobile numbers as document IDs
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setReferralAmount(userData.referralAmount || 0); // Update referralAmount state with the fetched value
        setCoins(userData.Coins || 0)
        
        setMyBeatScore(userData.MyBeatScore)
        setMyBeat2Score(userData.MyBeat2Score)
        
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  useEffect(() => {
    if (fullMobileNumber) {
      fetchReferralAmount(fullMobileNumber);
    }
  }, [fullMobileNumber]);

  const ReferralON = () => {
    setReferralBackgroundColor('#ccc')
    setCoinsBackgroundColor('white')
    setRechargeBackgroundColor('white')
    console.log('function Referral')
  }

  const CoinsON = () => {
    console.log('function Coins')
    setReferralBackgroundColor('white')
    setCoinsBackgroundColor('#ccc')
    setRechargeBackgroundColor('white')
  } 
  const RechargeON = () => {
    console.log('function Recharge')
    setReferralBackgroundColor('white')
    setCoinsBackgroundColor('white')
    setRechargeBackgroundColor('#ccc')
  } 

  const openMyBeatScoreHistory = () => {
    if (myBeatScoreHistory) {
      setMyBeatScoreHistory(false)
    } else {
      setMyBeatScoreHistory(true)
      setMyBeat2ScoreHistory(false)
    }
    
  }

  const openMyBeat2ScoreHistory = () => {
    if (myBeat2ScoreHistory) {
      setMyBeat2ScoreHistory(false)
    } else {
      setMyBeat2ScoreHistory(true)
      setMyBeatScoreHistory(false)
    }
    
  }

  const changeVisiblityOfRechargeOptions = () => {
    if (rechargeOptionsVisible) {
      setRechargeOptionsVisible(false)
    } else {
      setRechargeOptionsVisible(true)
    }
  }

  useEffect(() => {
  const fetchRechargeHistory = () => {
    const q = query(collection(db, 'recharges'), where('fullMobileNumber', '==', fullMobileNumber));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const history = [];
      querySnapshot.forEach((doc) => {
        history.push({ id: doc.id, ...doc.data() });
      });

      // Sort the history by createdAt in descending order to show the latest first
      const sortedHistory = history.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
      // Mark only the latest recharge as active
      if (sortedHistory.length > 0) {
        sortedHistory.forEach((item, index) => {
          item.isActive = index === 0; // Set isActive for the latest recharge only
        });
      }
setRechargeHistory(sortedHistory);
    }, (error) => {
      console.error('Error fetching recharge history:', error);
      Alert.alert('Error', 'Failed to fetch recharge history.');
    });

    return () => unsubscribe(); // Cleanup subscription
  };

  fetchRechargeHistory();
}, [fullMobileNumber]);

  
  const formatDateTime = (date) => {
        return date.toDate().toLocaleString(); // Formats to local date and time string
    };

    const getRemainingTime = (expiryDate, item) => {
    const now = new Date();
    const remainingTime = expiryDate.toDate() - now; // Calculate remaining time in milliseconds

    if (remainingTime <= 0) {
        // Hide time remaining, set referralBalance to 0, update status to expired
        updateExpiredStatus(item.id);  // Update Firestore with expired status
        return null; // Hides the time remaining display
    }

    // Convert remaining time to days, hours, minutes, seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return <Text>{days}d {hours}h {minutes}m {seconds}s</Text>; // Display remaining time
};

// Function to update expired status in Firestore
const updateExpiredStatus = async (itemId) => {
    try {
        const docRef = doc(db, 'recharges', itemId); // Update the specific recharge document

        // Update the document with status 'expired' and referralBalance to 0
        await updateDoc(docRef, {
            status: 'expired',
            referralBalance: 0,
        });

        console.log('Recharge expired and referralBalance updated to 0');
    } catch (error) {
        console.error('Error updating document:', error);
    }
};



  // Fetch referral history when component mounts
  useEffect(() => {
    const fetchReferralHistory = async () => {
      if (fullMobileNumber) {
        try {
          const userRef = doc(db, 'users', fullMobileNumber);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const history = userDoc.data().referralHistory || [];
            setReferralHistory(history);
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error('Error fetching referral history:', error);
        }
      }
    };

    fetchReferralHistory();
  }, [fullMobileNumber]);

  // Render each item in the referral history
  const renderReferralHistory = ({ item }) => {
    
    return(
      <View style={{ display: 'flex', flexDirection: 'column', borderWidth: 0.5, borderRadius: 7, padding: 10, marginTop: 5 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
          <View style={{ display: 'flex', flexDirection: 'row' }} >
            <Text style={{ color: item.type === 'Less' ? 'red':'green' }} >{item.type} </Text>
            <Text>Amount: {parseFloat(item.amount).toFixed(2)}</Text>
          </View>
          <Text>L: ({item.level})</Text>
        </View>
        <Text>Date: {formatDateTime(item.date)}</Text>
      </View>
    )
  };



  return (
    <SafeAreaView style={{ height: ScreenHeight, width: ScreenWidth }}>
      <StatusBar 
        barStyle="light-content" // Change text color (options: 'light-content', 'dark-content')
        backgroundColor="black" // Change background color (any valid color)
      />
      <View style={{ height: ScreenHeight, width: ScreenWidth }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ height: 50, width: 50 }} source={require('../assets/images/walletImage.png')} />
          <Text style={{ fontSize: 20 }}>Wallet</Text>
        </View>

        <FlatList
                data={rechargeHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ display:'none' }} // Ensure the FlatList doesn't overflow
            />

        <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={ReferralON} style={{borderWidth:0.5, backgroundColor:referralBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >Referral: ₹{parseFloat(referralAmount).toFixed(2)}</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CoinsON} style={{borderWidth:0.5, backgroundColor:coinsBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >Coins: {Coins}</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={RechargeON} style={{borderWidth:0.5, backgroundColor:rechargeBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >Recharge Bal: {updatedRechargeBalance}</Text></View>
              </TouchableOpacity>
        </View>
        
        {/* Display the referralAmount */}
        { referralBackgroundColor === '#ccc' && <View style={{padding: 10}}>
          <Text style={{marginBottom:10}}>Referral History</Text>
          <View style={{ maxHeight:ScreenHeight-190}}>
      <View style={{}}>
        

        {referralHistory.length > 0 ? (
          <FlatList
            data={referralHistory}
            renderItem={renderReferralHistory}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No referral history available</Text>
              )}
            </View>
            </View>
        </View>}

        {rechargeBackgroundColor === '#ccc' && <View style={{ padding: 10 }}>
          <View style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'flex-end', position:'absolute', zIndex:99, top:10,right:2}} >
          <TouchableOpacity onPress={changeVisiblityOfRechargeOptions} style={{backgroundColor:'black', borderRadius:7, width:125, height:28, display:'flex', alignItems:'center', justifyContent:'center'}} >
            <Text style={{ fontSize: 13, color:'white' }}>Recharge Now</Text>
            </TouchableOpacity>

            {rechargeOptionsVisible&&<RechargeOptions mobileNumber={fullMobileNumber}/>}
          </View>
          <Text style={{ marginBottom: 10, fontSize: 13 }}>Recharge History</Text>
          <FlatList
                data={rechargeHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ maxHeight: ScreenHeight - 190 }} // Ensure the FlatList doesn't overflow
            />
        </View>}

        
        { coinsBackgroundColor === '#ccc' && <View style={{padding: 10, gap:5}}>
          <TouchableOpacity onPress={openMyBeatScoreHistory} style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <View style={{display:'flex', flexDirection:'row'}} >
            <View style={{width:180}} ><Text style={{ fontSize: 18 }} >My Beat Score</Text></View>
            <View style={{width:10, display:'flex', alignItems:'center', justifyContent:'center'}} ><Text style={{ fontSize: 18 }} >:</Text></View>
            <View style={{width:100, display:'flex', justifyContent:'center'}} ><Text style={{ fontSize: 18, position:'absolute', right:0}} >{MyBeatScore || 0}</Text></View>
            </View>
            {myBeatScoreHistory && <View style={{ borderWidth: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 28.8, width: 28.8, borderColor: 'blue' }} >
              <Image style={{ height: 25, width: 25}} source={require('../assets/images/arrowDown.png')} ></Image>
            </View>}
            { !myBeatScoreHistory && <View style={{borderWidth:1, display:'flex', alignItems:'center', justifyContent:'center', height:25.8, width:25.8}} >
              <Image style={{ height: 25, width: 25}} source={require('../assets/images/arrowRight.png')} ></Image>
            </View>}
          </TouchableOpacity>

          {myBeatScoreHistory && <MyBeatScoreHistory mobileNumber={fullMobileNumber} />}

          <TouchableOpacity onPress={openMyBeat2ScoreHistory} style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <View style={{display:'flex', flexDirection:'row'}} >
            <View style={{width:180}} ><Text style={{ fontSize: 18 }} >My Beat 2 Score</Text></View>
            <View style={{width:10, display:'flex', alignItems:'center', justifyContent:'center'}} ><Text style={{ fontSize: 18 }} >:</Text></View>
            <View style={{width:100, display:'flex', justifyContent:'center'}} ><Text style={{ fontSize: 18, position:'absolute', right:0}} >{MyBeat2Score || 0}</Text></View>
            </View>
            {myBeat2ScoreHistory && <View style={{ borderWidth: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 28.8, width: 28.8, borderColor: 'blue' }} >
              <Image style={{ height: 25, width: 25}} source={require('../assets/images/arrowDown.png')} ></Image>
            </View>}
            { !myBeat2ScoreHistory && <View style={{borderWidth:1, display:'flex', alignItems:'center', justifyContent:'center', height:25.8, width:25.8}} >
              <Image style={{ height: 25, width: 25}} source={require('../assets/images/arrowRight.png')} ></Image>
            </View>}
          </TouchableOpacity>
          {myBeat2ScoreHistory && <MyBeat2ScoreHistory mobileNumber={fullMobileNumber} />}
        </View>}
        
        
        


        <BottomNavBar mobileNumber={fullMobileNumber} />
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
