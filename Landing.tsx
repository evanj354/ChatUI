import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, Image, Dimensions, Platform, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';

import backgroundImage from './assets/blueBackground.jpg';
import platicaLogo from './assets/logo.png';

const ec2Endpoint = "http://ec2-54-214-186-4.us-west-2.compute.amazonaws.com:5000";
const hostedUrl = "https://platica-backend.herokuapp.com/";
const serverUrl = "http://10.0.0.150:5000";

const { height, width } = Dimensions.get('window');


const Landing = () => {
  const [username, setUsername] = useState("");
  const [modalVisible, updateModalVisibility] = useState(false);
  const [progress, updateProgress] = useState({
    messagesSent: 0,
    wordsPerMessage: "",
    loginStreak: 0,
    correctSentenceRate: ""
  });



  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(ec2Endpoint+"/landing", {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }).then(response => 
      response.json().then(user => {
        if(user.authenticated) {
          setUsername(user.username);
          console.log(user.messagesSent)
          updateProgress({
            messagesSent: user.messagesSent, 
            wordsPerMessage: (user.wordCount/user.messagesSent).toFixed(2),
            loginStreak: user.loginStreak,
            correctSentenceRate: ((user.correctSentences/(user.messagesSent))*100).toFixed(2).concat("%")
          });
        }
        else {
          Actions.login();
        }
      }) 
      .catch(err => console.log(err))   
    );
  }

  const logout = () => {
    console.log('logging out');
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <View style={styles.circle}></View>

          <Modal 
            visible={modalVisible}
            animationType="slide"
            transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <View style={styles.modalTitle}>
                    <Text style={styles.modalTitleText}>Progress</Text>
                  </View>
                  <View style={styles.modalDataContainer}>
                    <Text style={styles.modalDataText}>Messages Sent: {progress.messagesSent}</Text>
                    <Text style={styles.modalDataText}>Words per Message: {progress.wordsPerMessage}</Text>
                    <Text style={styles.modalDataText}>Interaction Streak: {progress.loginStreak}</Text>
                    <Text style={{...styles.modalDataText, ...styles.modalBarText}}>Correct Grammatical Rate</Text>
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBar}>
                        <View style={{...styles.progressBarFill, width: progress.correctSentenceRate}}></View>
                      </View>
                      <Text style={{...styles.modalDataText, ...styles.modalBarText}}>{progress.correctSentenceRate}</Text>

                    </View>
                  </View>
                 

                  <TouchableHighlight
                    style={{...styles.closeButton}}
                    onPress={() => updateModalVisibility(false)}
                    >
                      <Text style={styles.text}>Close</Text>
                  </TouchableHighlight>
                </View>
              </View>
          </Modal>
          <Image style={styles.logo} source={platicaLogo}/>
          
          <View style={styles.buttonLayout}>
            <TouchableOpacity style={styles.btnStart} 
              onPress={ Platform.OS === "ios" ? () => Actions.ioschat({username: username}) : () => Actions.chat() }>
              <Text style={styles.text}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStart} 
              onPress={() => updateModalVisibility(true) }>
              <Text style={styles.text}>Progress</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome {username}!</Text>
          </View>
          <TouchableOpacity style={{...styles.btnStart, ...styles.alignBottom}} 
            onPress={ () => logout() }>
            <Text style={styles.text}>{'< Logout'}</Text>
          </TouchableOpacity>
           
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
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3, 
    padding: 6,
    marginTop: 1,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.3,
    
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    
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
    borderRadius: 10,
    shadowColor: '#800',
    shadowOffset: {
      width:0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.9,
    elevation: 5,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    paddingTop: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 22,
    fontWeight: '500',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },//'rgba(205, 224, 243, 1)'
  modalView: {
    backgroundColor: 'rgba(51,102,153,0.8)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#800',
    shadowOffset: {
      width:0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.9,
    elevation: 5
  },
  modalTitle:
  {
    height: 30, 
    width: 200,
    borderBottomColor: 'rgba(255, 255, 255, 0.7)', 
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  modalDataContainer: {
    paddingBottom: 10,
    justifyContent: 'flex-start'
  },
  modalDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)', 
    textAlign: 'left',
    marginVertical: 5,
  },
  modalBarText: {
    alignSelf: 'center',
    marginBottom: 0
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(72, 145, 217, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 6,
    elevation: 1,
  },
  progressBarContainer: {
    
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'rgba(51,102,153,0.8)',
    borderColor: 'rgba(0,0,0,0.9)',
    borderWidth: 2,
    borderRadius:5,
  },
  progressBarFill: {
    backgroundColor: 'rgba(102,204,51,0.8)',
    borderRadius: 3,
    height: '100%',
  },
  logo: {
    // color: 'rgba(0,0,0,0.8)',
    marginTop: 20,
    height: 200,
    width: 250,
    
  },
  alignBottom: {
    position: 'absolute',
    bottom: 200
  }
})

export default Landing;