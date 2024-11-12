import React, { useEffect, useState } from "react";
import {View,Text,Button,Alert,StatusBar,TouchableOpacity,ActivityIndicator,Dimensions,} from "react-native";
import {doc,getDoc,updateDoc,addDoc,collection,query,where,getDocs,} from "firebase/firestore";
// import RNUpiPayment from "react-native-upi-payment";
import { useRouter } from "expo-router";
import { db } from "./firebaseConfig"; // Your Firestore config
import { useRoute } from "@react-navigation/native";
// import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

const RechargePayment = () => {
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const route = useRoute();
  const router = useRouter();
  const mobileNumber = route.params?.mobileNumber;
  const duration = route.params?.duration;
  const price = route.params?.price;
  const fullMobileNumber = "+" + mobileNumber.replace(/\s+/g, "");
  const [referralAmount, setReferralAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentInProgress, setPaymentInProgress] = useState(false); // To manage loader state

  const fetchReferralAmount = async () => {
    try {
      const userRef = doc(db, "users", fullMobileNumber);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setReferralAmount(userDoc.data().referralAmount || 0);
      } else {
        Alert.alert("Error", "User does not exist.");
      }
    } catch (error) {
      console.error("Error fetching referral amount:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReferralAmount();
  }, [fullMobileNumber]);

  const distributeReferralBonus = async (referralCode, amount, index = 1) => {
    try {
      const q = query(
        collection(db, "users"),
        where("selfReferralCode", "==", referralCode)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const referringUser = querySnapshot.docs[0];
        const referringMobileNumber = referringUser.id;
        const referringUserRef = doc(db, "users", referringMobileNumber);
        const referringUserDoc = await getDoc(referringUserRef);

        if (referringUserDoc.exists()) {
          let currentReferralAmount =
            referringUserDoc.data().referralAmount || 0;
          let newReferralAmount = currentReferralAmount + amount;

          await updateDoc(referringUserRef, {
            referralAmount: newReferralAmount,
          });

          const referralHistoryEntry = {
            amount: amount,
            level: index,
            date: new Date(),
            type: "Add",
          };

          await updateDoc(referringUserRef, {
            referralHistory: [
              ...(referringUserDoc.data().referralHistory || []),
              referralHistoryEntry,
            ],
          });

          const nextReferralCode = referringUserDoc.data().referralCode;

          if (nextReferralCode && index <= 50) {
            let nextAmount;

            if (index === 1) {
              nextAmount = amount * 0.2;
            } else if (index <= 23) {
              nextAmount = amount * 0.9;
            } else if (index <= 50) {
              nextAmount = amount * 1;
            }

            await distributeReferralBonus(
              nextReferralCode,
              nextAmount,
              index + 1
            );
          }
        }
      } else {
        console.error(`No user found with referral code: ${referralCode}`);
      }
    } catch (error) {
      console.error("Error distributing referral bonus:", error);
    }
  };

  const handleReferralPayment = async () => {
    if (referralAmount < price) {
      Alert.alert("Error", "Insufficient referral balance.");
      return;
    }

    setPaymentInProgress(true); // Show loader

    try {
      const newReferralAmount = referralAmount - price;
      const expiryDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
      const userRef = doc(db, "users", fullMobileNumber);

      const deductionHistoryEntry = {
        amount: price,
        type: "Less",
        date: new Date(),
      };

      const userDoc = await getDoc(userRef);

      await updateDoc(userRef, {
        referralAmount: newReferralAmount,
        rechargeExpiry: expiryDate,
        rechargeBalance: price,
        referralHistory: [
          ...(userDoc.data().referralHistory || []),
          deductionHistoryEntry,
        ],
      });

      const referralCode = userDoc.data().referralCode;
      if (referralCode) {
        const initialReferralAmount = price * 0.2;
        await distributeReferralBonus(referralCode, initialReferralAmount);
        fetchReferralAmount();
      }

      await addDoc(collection(db, "recharges"), {
        fullMobileNumber,
        amount: price,
        duration,
        expiryDate,
        createdAt: new Date(),
      });

      Alert.alert(
        "Recharge Successful",
        `You have recharged for ${duration} days. Amount: ₹${price}`
      );
      router.push(`./Home?mobileNumber=${fullMobileNumber}`);
    } catch (error) {
      console.error("Error processing referral payment:", error);
      Alert.alert("Error", "Failed to process payment. Please try again.");
    } finally {
      setPaymentInProgress(false); // Hide loader
    }
  };

  const handlePhonePePayment = () => {
    setPaymentInProgress(true);
    // RNUpiPayment.initializePayment(
    //   {
    //     vpa: "9352000360@ybl", // or can be john@ybl or mobileNo@upi
    //     payeeName: "John Doe",
    //     amount: price,
    //     transactionRef: "aasf-332-aoei-fn",
    //   },
    //   successCallback,
    //   failureCallback
    // );
    setPaymentInProgress(false);

  };

  const getReferralCode = async (fullMobileNumber) => {
    try {
      const userRef = doc(db, "users", fullMobileNumber);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data().referralCode;
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
    return null;
  };

  // async function successCallback(data) {
  //   setPaymentInProgress(true); // Show loader
  //   try {
  //     // Assuming that the referral bonus is calculated as a percentage of price
  //     const referralCode = await getReferralCode(fullMobileNumber); // Get user's referral code
  //     if (referralCode) {
  //       const initialReferralAmount = price * 0.2; // 20% of price goes to referral bonus
  //       await distributeReferralBonus(referralCode, initialReferralAmount);
  //       fetchReferralAmount(); // Update the user's referral amount in UI
  //     }

  //     // Save recharge record (You can modify it as per your logic)
  //     await addDoc(collection(db, "recharges"), {
  //       fullMobileNumber,
  //       amount: price,
  //       duration,
  //       expiryDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
  //       createdAt: new Date(),
  //     });

  //     Alert.alert(
  //       "Recharge Successful",
  //       `You have recharged for ${duration} days. Amount: ₹${price}`
  //     );
  //     router.push(`./Home?mobileNumber=${fullMobileNumber}`);
  //   } catch (error) {
  //     console.error("Error processing referral payment:", error);
  //     Alert.alert("Error", "Failed to process payment. Please try again.");
  //   } finally {
  //     setPaymentInProgress(false); // Hide loader
  //   }
  // }

  // function failureCallback(data) {
  //   console.log(data);
  //   setPaymentInProgress(false);
  // }

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <View
      style={{
        height: ScreenHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View
        style={{
          padding: 20,
          gap: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderRadius: 10,
          paddingTop: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Recharge Payment</Text>
        </View>

        <Text>Amount: ₹{price}</Text>
        <Text style={{ marginTop: -10 }}>Duration: {duration} days</Text>
        <Text>Wallet Balance: ₹{parseFloat(referralAmount).toFixed(2)}</Text>

        {paymentInProgress ? (
          <ActivityIndicator size="large" color="black" /> // Loader shown during payment
        ) : (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                borderRadius: 7,
                width: ScreenWidth - 120,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleReferralPayment}
            >
              <Text style={{ color: "white" }}>Recharge Via Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                borderRadius: 7,
                width: ScreenWidth - 120,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handlePhonePePayment}
            >
              <Text style={{ color: "white" }}>Recharge Via PhonePe</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default RechargePayment;
