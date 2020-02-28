import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Router, Scene, Actions } from 'react-native-router-flux';


import Login from './Login'
import Landing from './Landing'
import Chat from './Chat'

import homeBackground from './assets/blueBackground.jpg';


const { height, width } = Dimensions.get('window');
// alert(height);

const Profile = (props) => {

  return (
    <View>
      <Image
        source={{ uri: props.image }}
      />
    </View>
  )
}


export default function App() {
  return (
    
      <SafeAreaView style={{height: height, flex:1}}>
        <Router>
          <Scene key="root">
            <Scene
              key="home"
              component={Home}
              title="Home"
              initial
            />
            <Scene
              key="login"
              component={Login}
              title="Login"
              
            />
            <Scene
              key="landing"
              component={Landing}
              title="Landing Page"
            />
            <Scene
              key="chat"
              component={Chat}
              title="Chat"
              
            />
          </Scene>
        
        </Router>
      </SafeAreaView>
 
  )
}

const Home = () => {
  

  const [count, setCount] = useState(0);
  let [selectedImage, setSelectedImage] = useState(null);


  let [loginPage, startLogin] = useState(false);
  let [username, editUsernameInput] = useState("");
  let [password, editPasswordInput] = useState("");
  
  let openImagePickerAsync = async() => {   //request permission to open camera roll
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted == false) {
      alert("Permission to camera roll required");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    // alert(selectedImage.localUri);
    return (
      <View style={styles.container}>
        <Profile image={selectedImage.localUri}/>
      </View>
    );
  }

  return (
    <ImageBackground  source={homeBackground} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to Platica</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => Actions.login()}
            style={styles.button}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ openImagePickerAsync }
            style={styles.button}>
            <Text style={styles.buttonText}> Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 42,
    color: 'rgba(255, 255, 255, 0.7)',
    
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: width/3,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
  }
  
});


