import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Import getDoc
import { db } from "./firebaseConfig"; // Import Firebase configuration
import "./main";
import CountryPicker from "react-native-country-picker-modal";
const SignUp = () => {
  function generateRandomString() {
    let alphabets =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let digits = "0123456789".split("");

    let randomString = "";

    // Generate 3 unique random alphabets
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      randomString += alphabets[randomIndex];
      alphabets.splice(randomIndex, 1); // Remove the used character to avoid repetition
    }

    // Generate 3 unique random digits
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      randomString += digits[randomIndex];
      digits.splice(randomIndex, 1); // Remove the used digit to avoid repetition
    }

    return randomString;
  }

  const selfReferralCode = generateRandomString();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const router = useRouter();
  const inputsHeight = 45;
  const inputsWidth = screenWidth - 100;
  const inputsBorderWidth = 2;
  const inputsPadding = 10;
  const inputsBorderRadius = 7;
  const [isChecked, setIsChecked] = useState(false);

  // State for form data
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("IN"); // Default country code
  const [callingCode, setCallingCode] = useState("+91"); // Default calling code
  let fullMobileNumber = callingCode + mobileNumber;
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(text)) {
      setErrorMessage(""); // Valid email
    } else {
      setErrorMessage("Please enter a valid email address"); // Invalid email
    }
    setEmail(text);
  };

  // Handle form submission and sending data to Firestore
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      Alert.alert("Error", "Mobile number must be 10 digits");
      return;
    }

    // Check for mandatory fields
    if (!name || !password || !confirmPassword || !email) {
      Alert.alert(
        "Error",
        "Name, Password, Confirm Password and Email are required"
      );
      return;
    }

    if (errorMessage) {
      Alert.alert("Error", "Please Enter Valid Email");
      return;
    }

    try {
      // Check if mobile number already exists
      const userDoc = doc(db, "users", fullMobileNumber);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        // Mobile number already registered, redirect to login page
        Alert.alert(
          "Info",
          "Mobile number is already registered. Please Login"
        );
        router.push("./"); // Redirect to login
      } else {
        setIsLoading(true);
        router.push(
          `./OTPConfirmation?fullMobileNumber=${fullMobileNumber}&name=${name}&password=${password}&referralCode=${
            referralCode || ""
          }&address=${address || ""}&email=${email}&instagramId=${
            instagramId || ""
          }&facebookId=${
            facebookId || ""
          }&selfReferralCode=${selfReferralCode}&mobileNumber=${mobileNumber}`
        );
      }
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      Alert.alert("Error", "Failed to sign up user");
    }
  };

  const goToLogin = () => {
    router.push("./");
  };

  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <StatusBar
        barStyle="light-content" // Change text color (options: 'light-content', 'dark-content')
        backgroundColor="black" // Change background color (any valid color)
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: screenHeight - 700,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, width: screenWidth - 100 }}>
            Sign Up
          </Text>
        </View>

        <ScrollView
          style={{ maxHeight: 452 }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: inputsBorderWidth,
              borderRadius: inputsBorderRadius,
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
              style={{
                height: inputsHeight,
                width: inputsWidth - 74,
                padding: inputsPadding,
                outlineStyle:'none'
              }}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <TextInput
            placeholder="Name"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Create Password"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            placeholder="Email Address"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
              borderColor: errorMessage ? "red" : "black",
            }}
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Referral Code (Optional)"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            value={referralCode}
            onChangeText={setReferralCode}
          />
          <TextInput
            placeholder="Address (Optional)"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            placeholder="Instagram Id (Optional)"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            value={instagramId}
            onChangeText={setInstagramId}
          />
          <TextInput
            placeholder="Facebook Id (Optional)"
            style={{
              height: inputsHeight,
              width: inputsWidth,
              borderWidth: inputsBorderWidth,
              padding: inputsPadding,
              borderRadius: inputsBorderRadius,
            }}
            value={facebookId}
            onChangeText={setFacebookId}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isChecked ? "black" : "transparent",
              }}
              onPress={() => setIsChecked(!isChecked)} // Toggle the checkbox state
            >
              {isChecked && (
                <Ionicons name="checkmark" size={15} color="white" />
              )}
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, fontSize: 10, marginTop: 1 }}>
              I agree to the terms and conditions*
            </Text>
          </View>
        </ScrollView>

        <View style={{ height: 60 }}>
          {/* Disable the Sign Up button if the checkbox is not checked */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={!isChecked} // Disable if fields are empty or checkbox not checked
            style={{
              width: screenWidth - 100,
              borderWidth: 2,
              borderRadius: 7,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isChecked ? "black" : "grey", // Change color based on checkbox state
              display: "flex",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Sign Up</Text>
          </TouchableOpacity>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              width: screenWidth - 100,
            }}
          >
            <TouchableOpacity
              onPress={goToLogin}
              style={{ width: screenWidth - 100 }}
            >
              <Text style={{ textAlign: "right", fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
