import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from "./firebaseConfig"; // Import Firebase configuration
import "./main";
import { useNavigation } from "@react-navigation/native";
import CountryPicker from "react-native-country-picker-modal";

const Index = () => {
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const router = useRouter();

  // State variables for mobile number and password
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("IN"); // Default country code
  const [callingCode, setCallingCode] = useState("+91"); // Default calling code

  const fullMobileNumber = callingCode + mobileNumber.replace(/\s+/g, "");

  const goToSignUp = () => {
    router.push(`./SignUp`);
  };

  const goToForgotPassword = () => {
    router.push(`./ForgotPassword`);
  };

  const goToHome = () => {
    router.push(`./Home?mobileNumber=${fullMobileNumber}`);
  };

  // Handle the login functionality
  const handleLogin = async () => {
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      Alert.alert("Error", "Mobile number must be 10 digits");
      return;
    }

    try {
      // Fetch the user document based on the mobile number
      const userDoc = doc(db, "users", fullMobileNumber);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        // Check if the password matches
        if (userData.password === password) {
          goToHome(); // Redirect to home on successful login
        } else {
          Alert.alert("Error", "Incorrect password");
        }
      } else {
        Alert.alert("Error", "Mobile number not registered");
        goToSignUp();
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to log in");
    }
  };

  return (
    <View>
      <StatusBar
        barStyle="light-content" // Change text color (options: 'light-content', 'dark-content')
        backgroundColor="black" // Change background color (any valid color)
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: screenHeight,
          width: screenWidth,
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, width: screenWidth - 100 }}>Login</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 3,
            borderRadius: 7,
            width: screenWidth - 100,
            paddingLeft:10
          }}
        >
          <CountryPicker
            withFlag
            withCallingCode
            countryCode={countryCode}
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(`+${country.callingCode}`);
            }}
          />
          <Text>{callingCode}</Text>
          <TextInput
            placeholder="Mobile Number"
            style={{ height: 50, padding: 10, width: screenWidth - 174, outlineStyle:'none' }}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <TextInput
          placeholder="Password"
          style={{
            height: 50,
            width: screenWidth - 100,
            borderWidth: 3,
            padding: 10,
            borderRadius: 7,
          }}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin} // Call the handleLogin function
          style={{
            width: screenWidth - 100,
            borderWidth: 3,
            borderRadius: 7,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            display: "flex",
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Login</Text>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: screenWidth - 300,
          }}
        >
          <TouchableOpacity onPress={goToForgotPassword}>
            <Text style={{ color: "blue" }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToSignUp}>
            <Text style={{ fontSize: 16 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
