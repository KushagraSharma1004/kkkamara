import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker';
const VenderRegistration = () => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>VenderRegistration</Text>
            <ScrollView >
                <View>
                    <View style={{flexDirection:'column', borderWidth:1, marginTop: 10, width:'98%', alignSelf:'center', borderRadius:7, padding:7, gap:5 }} >
                        <View style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexDirection: 'row'}}>
                            <View style={{ display:'flex', flexDirection:'row', borderRadius:7, gap:10}} >
                                <View style={{ height: 80, width: 80, borderWidth: 0.5, borderRadius:7 }} ></View>
                                <View style={{display:'flex', flexDirection:'column'}} >
                                    <TextInput placeholder='Name/Store/Firm/Company' style={{fontSize:13, fontWeight:'bold', padding:0, margin:0, borderWidth:1}} ></TextInput>
                                    <View style={{display:'flex', flexDirection:'column', gap:3}} >
                                        <TextInput placeholder='Pincode' style={{ fontSize: 10, borderWidth: 1 }} ></TextInput>
                                        <TextInput placeholder='Street, Plot/Shop no.' style={{fontSize:10, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='Area' style={{fontSize:10, padding:0, margin:0, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='City' style={{fontSize:10, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='State' style={{fontSize:10, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='Category' style={{fontSize:10, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='Sub Category' style={{fontSize:10, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='Products' style={{fontSize:10, borderWidth:1}} ></TextInput>
                                        <TextInput placeholder='Description' style={{fontSize:10, borderWidth:1}} ></TextInput>
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
            </ScrollView>
         </SafeAreaView>
  )
}

export default VenderRegistration

const styles = StyleSheet.create({})