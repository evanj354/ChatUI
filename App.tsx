import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { globalStyles } from './globalStyles/globalStyles'


import Login from './Login'
import Landing from './Landing'
import Chat from './Chat'
import IOSChat from './IOSChat'
import Register from './Register'

import platicaLogo from './assets/logo.png';
import backgroundImage from './assets/blueBackground.jpg';


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
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      {/* <SafeAreaView style={{height: height, flex:1, backgroundColor: '#000'}} > */}
        <Router>
          <Scene key="root" >
            <Scene
              key="home"
              component={Home}
              title="Home"
              hideNavBar={true}

            />
            <Scene
              key="login"
              component={Login}
              title=""
              
            />
             <Scene
              key="register"
              component={Register}
              title="Register"
              initial
            />
            <Scene 
              key="landing"
              component={Landing}
              title="Menu"
              hideNavBar={true}
              
            />
            <Scene
              key="chat"
              component={Chat}
              title="Chat"
              
              
            />
            <Scene
              key="ioschat"
              component={IOSChat}
              title="Chat"
              
              
            />
          </Scene>
        
        </Router>
      {/* </SafeAreaView> */}
    </ImageBackground>
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
    <ImageBackground  source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
      <View style={styles.circle}></View>
        <Image style={globalStyles.logo} source={platicaLogo}/>

        
        <View style={{...styles.buttonContainer, marginTop: 10}}>
          <TouchableOpacity
            onPress={() => Actions.login()}
            style={{...globalStyles.btnStart, width: width/3}}>
            <Text style={globalStyles.text}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => Actions.register() }
            style={{...globalStyles.btnStart, width: width/3}}>
            <Text style={globalStyles.text}> Register </Text>
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
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
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
  headerText: {
    marginTop: 100,
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


