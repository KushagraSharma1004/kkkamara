import { StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import BottomNavBar from './BottomNavBar';
import { useRoute } from '@react-navigation/native';
import { db } from './firebaseConfig'; // Import your Firestore configuration
import { collection, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const Referral = () => {
    const ScreenHeight = Dimensions.get('window').height;
    const ScreenWidth = Dimensions.get('window').width;
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  const [referredNumbers, setReferredNumbers] = useState([]);

  const fetchReferredNumbers = async () => {
    try {
      const myReferredRef = collection(db, `users/${fullMobileNumber}/myReferred`);
      const snapshot = await getDocs(myReferredRef);
      const referrals = snapshot.docs.map(doc => ({
        id: doc.id, // Mobile number
        ...doc.data(),
      }));
      setReferredNumbers(referrals.reverse()); // Reverse the order here
    } catch (error) {
      console.error('Error fetching referred numbers:', error);
    }
  };

  useEffect(() => {
    fetchReferredNumbers();
  }, [fullMobileNumber]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.item}>
        {referredNumbers.length - index}: {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000" // Change background color to black
      />
      <View style={styles.innerContainer}>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 10 }} >
          <Image style={{height:35, width:35}} source={require('../assets/images/referralLogo.png')}/>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>My Referrals</Text>
      </View>
        {referredNumbers.length > 0 ? (
          <FlatList
            data={referredNumbers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} // Unique ID for each referred number
            contentContainerStyle={{paddingBottom: 0,
    maxHeight: ScreenHeight - 130,}}
            
          />
        ) : (
          <Text style={styles.noReferrals}>No referred numbers found.</Text>
        )}
        
      </View>
      <BottomNavBar mobileNumber={fullMobileNumber} />
    </SafeAreaView>
  );
};

export default Referral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background for better contrast
  },
  innerContainer: {
    flex: 1,
    padding:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40', // Dark color for the title
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff', // White background for each item
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 3, // Add shadow effect on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  item: {
    fontSize: 18,
    color: '#495057', // Gray color for item text
  },
  listContainer: {
    
    
  },
  noReferrals: {
    fontSize: 18,
    color: '#6c757d', // Gray color for no referrals text
    textAlign: 'center',
    marginTop: 20,
  },
});
