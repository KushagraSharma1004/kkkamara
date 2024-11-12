import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Share,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
// import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'
import { router, useRouter } from "expo-router";
import Menu from "./Menu";
import BottomNavBar from "./BottomNavBar";
import "./main";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const ScreenHeight = Dimensions.get("window").height;
  const ScreenWidth = Dimensions.get("window").width;
  const bounceValue = useRef(new Animated.Value(1)).current;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const bounce = () => {
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => bounce());
    };

    bounce();
  }, [bounceValue]);

  const route = useRoute();
  const router = useRouter();

  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = "+" + mobileNumber.replace(/\s+/g, "");

  useEffect(() => {
    const fetchUserData = async () => {
      // if (!mobileNumber) {
      //   Alert.alert('Error', 'Mobile number is not available');
      //   setLoading(false);
      //   return;
      // }

      try {
        const userDoc = doc(db, "users", fullMobileNumber);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();

          if (typeof data.name !== "string") {
            console.error("Expected name to be a string, but got:", data.name);
          }

          setUserData(data);
        } else {
          Alert.alert("Error", "No user found with this mobile number");
        }
      } catch (error) {
        // console.error('Error fetching user data:', error);
        // Alert.alert('Error', 'Failed to fetch user data');
      } finally {
        // setLoading(false);
      }
    };

    fetchUserData();
  }, [fullMobileNumber]);

  const openGames = () => {
    router.push(`./Games?mobileNumber=${fullMobileNumber}`);
  };

  const openEducation = () => {
    router.push(`./Education?mobileNumber=${fullMobileNumber}`);
  };

  const openBuyAndSell = () => {
    router.push(`./BuyAndSell?mobileNumber=${fullMobileNumber}`);
  }

  const openShopping = () => {
    router.push(`./Shopping?mobileNumber=${fullMobileNumber}`);
  }

  const openEntertainment = () => {
    router.push(`./Entertainment?mobileNumber=${fullMobileNumber}`);
  }

  const openHealth = () => {
    router.push(`./Health?mobileNumber=${fullMobileNumber}`);
  }

  const openTravelling = () => {
    router.push(`./Travelling?mobileNumber=${fullMobileNumber}`);
  }

  const openClub = () => {
    router.push(`./Club?mobileNumber=${fullMobileNumber}`);
  }

  const openLocalVendors = () => {
    router.push(`./LocalVendors?mobileNumber=${fullMobileNumber}`);
  }

  const shareReferralCode = async () => {
    try {
      const result = await Share.share({
        message: `🎉🎊 You're in for something special!\nUse my Referral Code: ${userData.selfReferralCode} 🎁 to unlock exclusive rewards and bonuses!\n✨💎 Get VIP access, incredible deals, and start earning big!\n🚀💰 Don't miss out—grab this chance to level up now! 🎯⚡️`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with specific activity
          // Alert.alert('Shared via', result.activityType);
        } else {
          // shared
          // Alert.alert('Success', 'Content shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // Alert.alert('Cancelled', 'Content sharing dismissed');
      }
    } catch (error) {
      // Alert.alert('Error', 'An error occurred while sharing content');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content" // Change text color (options: 'light-content', 'dark-content')
        backgroundColor="black" // Change background color (any valid color)
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{ height: 30, width: 30 }}
          source={require("../assets/images/home.png")}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 0.2,
          borderColor: "grey",
          marginTop: 1,
        }}
      ></View>
      <View style={{ padding: 10 }}>
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <View
            style={{
              maxHeight: 500,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={openGames}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 40, width: 70 }}
                source={require("../assets/images/gameController.jpg")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Games</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openEducation}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 12 }}>Education</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openShopping}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 42, width: 50 }}
                source={require("../assets/images/shoppingImage.jpg")}
              ></Image>
              <Text style={{ fontSize: 12, }}>Shopping</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openEntertainment}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../assets/images/entertainmentImage.jpg")}
              ></Image>
              <Text style={{ fontSize: 9 }}>Entertainment</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              maxHeight: 500,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={openHealth}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 40, width: 70 }}
                source={require("../assets/images//healthImage.jpg")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Health</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openTravelling}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 40, width: 70 }}
                source={require("../assets/images/travelImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Travelling</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClub}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 40, width: 50 }}
                source={require("../assets/images/clubImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Club</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openBuyAndSell}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 38, width: 40 }}
                source={require("../assets/images/buyAndSellImage.png")}
              ></Image>
              <Text style={{ fontSize: 12 }}>Buy & Sell</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              maxHeight: 500,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={openLocalVendors}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 45, width: 55 }}
                source={require("../assets/images/localVendorsImage.png")}
              ></Image>
              <Text style={{ fontSize: 9 }}>Local Vendors</Text>
            </TouchableOpacity>

            
          </View>
        </View>

        <TouchableOpacity
          onPress={shareReferralCode}
          style={{
            backgroundColor: "#c9c9c4",
            height: 60,
            width: ScreenWidth - 20,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
            <Icon name="gift" size={30} color="black" />
          </Animated.View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ color: "black" }}>Refer and earn</Text>
            <Text style={{ color: "grey", fontSize: 10 }}>
              Earn unlimited* from every referral
            </Text>
          </View>

          <View
            style={{
              height: 25,
              width: 90,
              backgroundColor: "black",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Refer Now</Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomNavBar mobileNumber={fullMobileNumber} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
