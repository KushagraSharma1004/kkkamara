import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, ScrollView, BackHandler } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const LocalVendors = () => {
    const router = useRouter();
    const [displayedText, setDisplayedText] = useState('');
    const [animatedGroceryText, setAnimatedGroceryText] = useState('');
    const [userData, setUserData] = useState(null);
    const typingSpeed = 100; // Typing speed in milliseconds
    const route = useRoute();
    const mobileNumber = route.params?.mobileNumber;
    const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
    const Group2Width = 170;
    const [isGroceryStoresVisible, setIsGroceryStoresVisible] = useState(false);
    const [isVendorListVisible, setIsVendorListVisible] = useState(true);

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

    // Typing effect for Vendor List view
    useEffect(() => {
        if (!isVendorListVisible || !userData) return;
        
        const fullText = `  World of Vendors  `;
        let index = 0;
        setDisplayedText('');

        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText[index]);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [userData, isVendorListVisible]);

    // Typing effect for Grocery Stores view
    useEffect(() => {
        if (!isGroceryStoresVisible || !userData) return;
        
        const fullText = `  World Of Grocery Store Vendors  `;
        let index = 0;
        setAnimatedGroceryText('');

        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setAnimatedGroceryText((prev) => prev + fullText[index]);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [userData, isGroceryStoresVisible]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView >
                {isGroceryStoresVisible && (
                    <View>
                        <View style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{animatedGroceryText}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'column', borderWidth:1, marginTop: 10, width:'98%', alignSelf:'center', borderRadius:7, padding:7, gap:5 }} >
                        <View style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexDirection: 'row'}}>
                            <View style={{ display:'flex', flexDirection:'row', borderRadius:7, gap:10}} >
                                <View style={{ height: 80, width: 80, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{display:'flex', flexDirection:'column'}} >
                                    <Text style={{fontSize:13, fontWeight:'bold'}} >Name Of Store</Text>
                                    <View style={{display:'flex', flexDirection:'column', gap:3}} >
                                        <Text style={{fontSize:10}} >Area</Text>
                                        <Text style={{fontSize:10}} >City</Text>
                                        <Text style={{fontSize:10}} >Pincode</Text>
                                    </View>
                                </View>
                            </View>

                            </View>
                            <View style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <ScrollView horizontal style={{ width: '90%', display: 'flex', flexDirection: 'row', borderRadius: 7 }} >
                                <View style={{gap: 3, flexDirection: 'row'}} >
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{ height: 50, width: 50, borderWidth: 0.5, borderRadius:7 }} ></View>
                                </View>
                            </ScrollView>
                            </View>
                            
</View>
                        
                        
                    </View>
                )}
                {isVendorListVisible && (
                    <View>
                        <View style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{displayedText}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexWrap: 'wrap', marginTop: 10, gap: 10, justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsGroceryStoresVisible((prev) => !prev);
                                    setIsVendorListVisible((prev) => !prev);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderWidth: 1,
                                    width: Group2Width,
                                    height: 70,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}
                            >
                                <Image style={{ height: 40, width: 40 }} source={require('../assets/images/groceryStoresImage.png')} />
                                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Grocery Stores</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
            <BottomNavBar mobileNumber={fullMobileNumber} />
        </SafeAreaView>
    );
};

export default LocalVendors;

const styles = StyleSheet.create({});
