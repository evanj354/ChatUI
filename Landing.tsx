import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';



const Landing = () => {
  
  
  return (
    <View style={styles.container}>
      <View style={styles.landingArea}>
        <Text style={styles.title}>Choose an Option</Text>
        <View style={styles.buttonLayout}>
          <Button title="Start Chatting" onPress= {() => Actions.chat()}></Button>
          <Button title="View Progress" onPress= {() => alert("Here is your progress")}></Button>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingArea: {
    height: 500,
    width: 500,
    marginTop: 50,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 36,
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 8,
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  }

})

export default Landing;