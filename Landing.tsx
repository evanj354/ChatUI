import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button, Dimensions, Platform, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';

import backgroundImage from './assets/blueBackground.jpg';

const ec2Endpoint = "http://ec2-54-214-186-4.us-west-2.compute.amazonaws.com:5000";
const hostedUrl = "https://platica-backend.herokuapp.com/";
const serverUrl = "http://10.0.0.150:5000";

const { height, width } = Dimensions.get('window');


const Landing = () => {
  const [username, setUsername] = useState("");
  const [modalVisible, updateModalVisibility] = useState(false);
  const [progress, updateProgress] = useState({
    messagesSent: 0
  });


  useEffect(() => {
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
          updateProgress({messagesSent: user.messagesSent});
        }
        else {
          Actions.login();
        }
      }) 
      .catch(err => console.log(err))   
    );
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <View style={styles.circle}></View>

        <View>
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
          <Text style={styles.title}>Welcome {username}</Text>
          <View style={styles.buttonLayout}>
            <TouchableOpacity style={styles.btnStart} 
              onPress={ Platform.OS === "ios" ? () => Actions.ioschat() : () => Actions.chat() }>
              <Text style={styles.text}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStart} 
              onPress={() => updateModalVisibility(true) }>
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
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    backgroundColor: 'rgba(205, 224, 243, 1)',
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
    textAlign: 'left'
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(72, 145, 217, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 6,
    elevation: 1,
    
  }
})

export default Landing;