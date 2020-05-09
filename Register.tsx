import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from './globalStyles/globalStyles'


const ec2Endpoint = "http://ec2-54-214-186-4.us-west-2.compute.amazonaws.com:5000";
const hostedUrl = "https://platica-backend.herokuapp.com/";
const serverUrl = "http://10.0.0.150:5000";
const remoteUrl = "http://"

import backgroundImage from './assets/blueBackground.jpg';
import platicaLogo from './assets/logo.png';

// alert("Logging In");
//     http.post('/login')
//     .then(() => alert("Logged In") )
//     .catch((err) => console.log(err))

const { height, width } = Dimensions.get('window');

const Register = () => {

  let [loginPage, startLogin] = useState(false);
  let [username, editUsernameInput] = useState("");
  let [password, editPasswordInput] = useState("");
  let [retypePassword, editRetypePasswordInput] = useState("")


  useEffect(() => {
    fetch(ec2Endpoint+"/logout",
    {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      
    }
    ).then(response => {
      response.json().then(user => {
        console.log(user.status);
      }) 
    })
  }, []); 

  let handleRegister = () => {

    const credentials = { username, password, retypePassword };
    fetch(ec2Endpoint+"/register",
      {
        mode: 'cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      }
    ).then(response => {
      response.json().then(user => {
        editUsernameInput("");
        editPasswordInput("");
        editRetypePasswordInput("");
        if(user.authenticated) {  
          console.log(user.status);
          Actions.landing();
        }
        else {
          alert(user.status);
          Actions.register();
        }
      }) 
      return response.json;
    }).catch(err => console.log(err));
  }

  return (
    <ImageBackground  source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.circle}></View>
      <View style={styles.loginContainer}>
      

        <Image style={globalStyles.logo} source={platicaLogo}/>
        
        <View style={{marginTop: 10}}>
         
          <View style={styles.inputBox}>
            <MaterialIcons name='person-outline' size={28} 
              style={styles.inputIcon}/>
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              onChangeText={text => editUsernameInput(text)}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.inputBox}>
            <Feather name='lock' size={22}
              style={styles.inputIcon}/>
            <TextInput
              style={styles.input}
              placeholder={'Password'}
              onChangeText={text => editPasswordInput(text)}
              secureTextEntry={true}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.inputBox}>
            <Feather name='lock' size={22}
              style={styles.inputIcon}/>
            <TextInput
              style={styles.input}
              placeholder={'Retype password'}
              onChangeText={text => editRetypePasswordInput(text)}
              secureTextEntry={true}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
            />
          </View>
        <TouchableOpacity style={{...globalStyles.btnStart, width: width/2, alignSelf: 'center'}} onPress={() => { handleRegister();}}>
          <Text style={globalStyles.text}>Register</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </ImageBackground>
  )
} 

const styles = StyleSheet.create({
  backgroundContainer: {
    height: height,
  },
  loginContainer: {
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
  logoContainer: {
    margin: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '500',
    color: 'white',
    opacity: 0.8,
    
  },
  
  inputBox: {
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width: width - 75,
    height: 50,
    borderRadius: 25,
  },
  input: {
    ...Platform.select({
      web: {
        outlineColor: 'transparent',
      },
    }),
    fontSize: 16,
    paddingLeft: 35,
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  passinput: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width: width - 75,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 55,
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  inputIcon: {
    position: 'absolute',
    top: 12,
    left: 15,
    opacity: 0.7,
    color: 'white'
  },
  btnLogin: {
    width: width/2,
    height: 45,
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 5,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 22,
  }
});

export default Register;