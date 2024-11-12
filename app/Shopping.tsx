import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const Shopping = () => {
    const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
      const fullMobileNumber = "+" + mobileNumber.replace(/\s+/g, "");
 
  return (
      <SafeAreaView>
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
          alignItems:'center'
        }}
      >
        <Image
          style={{ height: 25, width: 30 }}
          source={require("../assets/images/shoppingImage.jpg")}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Shopping</Text>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 0.2,
          borderColor: "grey",
          marginTop: 1,
        }}
      ></View>
          <ScrollView>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, padding:10}} >
              <View style={{ display: 'flex', flexDirection: 'column'}} >
            <TouchableOpacity
                onPress={() => {
                Linking.openURL('https://flipkart.com')
              }}
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
                style={{ height: 65, width: 70, borderRadius:10, }}
                source={require("../assets/images/flipkartImage.png")}
              ></Image>
              
            </TouchableOpacity>
              </View>

              <View style={{ display: 'flex', flexDirection: 'column'}} >
            <TouchableOpacity
                onPress={() => {
                Linking.openURL('https://amazon.in')
              }}
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
                style={{ height: 65, width: 65, borderRadius:10}}
                source={require("../assets/images/amazonImage.png")}
              ></Image>
              
            </TouchableOpacity>
                  </View>
              </View>
          </ScrollView>
    </SafeAreaView>
  )
}

export default Shopping

const styles = StyleSheet.create({})