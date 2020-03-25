import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Platform, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';

import backgroundImage from './assets/blueBackground.jpg';

const { height, width } = Dimensions.get('window');


const Landing = () => {
  
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <View style={styles.circle}></View>
        <View>
          <Text style={styles.title}>Welcome</Text>
          <View style={styles.buttonLayout}>
            <TouchableOpacity style={styles.btnStart} 
              onPress={ Platform.OS === "ios" ? () => Actions.ioschat() : () => Actions.chat() }>
              <Text style={styles.text}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStart} 
              onPress={() => alert("View Progress") }>
              <Text style={styles.text}>Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  backgroundContainer: {
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circle: {
    width: 480,
    height: 480,
    borderRadius: 480/2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    position: "absolute",
    alignSelf: 'center',
    left: -110,
    top: -40,
  },
  title: {
    marginTop: 150,
    fontSize: 32,
    fontWeight: '500',
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginVertical: 8,
  },
  buttonLayout: {
    // marginTop: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    
  },
  btnStart: {
    width: width/3,
    height: 45,
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    paddingTop: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 22,
  }
})

export default Landing;