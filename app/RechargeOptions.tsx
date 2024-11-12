import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { db } from './firebaseConfig'; // Import your Firebase configuration
import { doc, updateDoc, collection, addDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { router, useRouter } from 'expo-router'

const RechargeOptions = ({ mobileNumber }) => {
const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
    const [selectedOption, setSelectedOption] = useState('365');
    const [rechargeOptionsVisible, setRechargeOptionsVisible] = useState(true);
    const router = useRouter()
    const options = [
        { id: '30', label: '30 Days', price: 120, duration: 30 },
        { id: '90', label: '90 Days', price: 340, duration: 90 },
        { id: '180', label: '180 Days', price: 650, duration: 180 },
        { id: '365', label: '365 Days', price: 1200, duration: 365 },
    ];

    const handleSelect = (id) => {
        setSelectedOption(id);
    };

    const distributeReferralBonus = async (referralCode, amount, index = 1) => {
    try {
        // Query to find the user who used this referralCode
        const q = query(collection(db, 'users'), where('selfReferralCode', '==', referralCode));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const referringUser = querySnapshot.docs[0];
            const referringMobileNumber = referringUser.id; // Get the referring user's mobile number
            const referringUserRef = doc(db, 'users', referringMobileNumber);
            const referringUserDoc = await getDoc(referringUserRef);

            if (referringUserDoc.exists()) {
                let currentReferralAmount = referringUserDoc.data().referralAmount || 0;
                let newReferralAmount = currentReferralAmount + amount;

                // Update referralAmount for the current user
                await updateDoc(referringUserRef, { referralAmount: newReferralAmount });

                // Add to referral history
                const referralHistoryEntry = {
                    amount: amount,
                    level: index,
                    date: new Date(),
                    type:'Add'
                };

                await updateDoc(referringUserRef, {
                    referralHistory: [...(referringUserDoc.data().referralHistory || []), referralHistoryEntry]
                });

                console.log(`Level ${index} - Updated referralAmount for ${referringMobileNumber}: ${newReferralAmount}`);
                console.log(`Referral history updated for ${referringMobileNumber}`);

                // Retrieve next referralCode
                const nextReferralCode = referringUserDoc.data().referralCode;
                console.log(`Next Referral Code (Level ${index}): ${nextReferralCode}`);

                // Proceed to the next referral level only if the referral code exists and index <= 50
                if (nextReferralCode && index <= 50) {
                    let nextAmount;

                    // Define the bonus distribution for each level
                    if (index === 1) {
                        nextAmount = amount * 0.2; // Pass 20% to the next level
                    } else if (index <= 23 && index !== 1) {
                        nextAmount = amount * 0.9; // Pass 90% to the next level
                    } else if (index <= 50 && index !== 23) {
                        nextAmount = amount * 1; // Pass 100% to the next level
                    }

                    console.log(`Passing ${nextAmount} to Level ${index + 1}`);
                    // Recursive call to distribute to the next level
                    await distributeReferralBonus(nextReferralCode, nextAmount, index + 1);
                } else {
                    console.log(`No more levels to process or max levels reached (Level ${index})`);
                }
            } else {
                console.error(`Referring user document does not exist for mobile number: ${referringMobileNumber}`);
            }
        } else {
            console.error(`No user found with referral code: ${referralCode}`);
        }
    } catch (error) {
        console.error('Error distributing referral bonus:', error);
    }
};


    

    const handleConfirm = async() => {
    setRechargeOptionsVisible(false);
    if (!selectedOption) {
        Alert.alert('Please select a recharge option.');
        return;
    }

    // Assuming 'selectedOption' is an ID or some identifier of the selected coupon
    const selected = options.find(option => option.id === selectedOption);
    
    if (!selected) {
        Alert.alert('Invalid option selected.');
        return;
    }

    // Extracting the details of the selected recharge option (price and duration for example)
    const { price, duration } = selected;

    // Redirecting to RechargePayment screen with details in the query params
    router.push(`./RechargePayment?mobileNumber=${fullMobileNumber}&price=${price}&duration=${duration}`);
};


    return (
        <View style={{ borderWidth: 1, borderRadius: 7, maxHeight: 400, width: '50%', padding: 10, marginTop: 2, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 12 }}>Recharge Options</Text>
            <View style={{ borderWidth: 1, borderColor: '#ccc', marginTop: 2 }} />
            <View style={{ marginTop: 10, gap: 10 }}>
                {options.map((option) => (
                    <View key={option.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                width: 20,
                                height: 20,
                                borderWidth: 2,
                                borderColor: '#000',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: selectedOption === option.id ? 'black' : 'transparent',
                            }}
                            onPress={() => handleSelect(option.id)}
                        >
                            {selectedOption === option.id && <Ionicons name="checkmark" size={15} color="white" />}
                        </TouchableOpacity>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: 5, fontSize: 13 }}>{option.label}</Text>
                            <Text style={{ fontSize: 13 }}>₹{option.price}</Text>
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={{ borderRadius: 7, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}
                    onPress={handleConfirm}
                >
                    <Text style={{ color: 'white' }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RechargeOptions;

const styles = StyleSheet.create({});
