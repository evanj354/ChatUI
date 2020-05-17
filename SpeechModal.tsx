import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Modal, TextInput, Button, Image, Dimensions, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import {globalColors, globalStyles } from './globalStyles/globalStyles';
import { Feather } from '@expo/vector-icons';

const VolumeIcon = (props) => {
  const { isVisible } = props;
  const [volume, setVolume] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);

  const volumes = ['volume', 'volume-1', 'volume-2'];

  useEffect(() => {
    setStartAnimation(true);
    
  }, []);

  useEffect(() => {
    let interval = null;
    if(isVisible) {
      interval = setInterval(() => {
        setVolume(volume => (volume+1)%3);
      }, 500);

    }
    return () => clearInterval(interval);

  }, [volume, startAnimation]);

  return (
    <Feather name={volumes[volume]} size={48} style={styles.speakerIcon} color={globalColors.white}/>
  )

}


const SpeechModal = (props) => {
  let {modalTitle, countdown, startRecording, stopRecording, getTranscription, visible, beginTiming} = props;

  let [isVisible, setIsVisible] = useState(visible);
  let [timeLeft, setTimeLeft] = useState(countdown);
  let [startTimer, setStartTimer] = useState(false);


  
  useEffect(() => {
    console.log('UseEffect Modal');
    setStartTimer(true);
    startRecording();
  }, []);

  useEffect(() => {
    if(visible==true) {
      console.log('UseEffect With Visible Prop');
      setIsVisible(true);
      setStartTimer(true);
      startRecording();
    }
    
  }, [visible]);

  useEffect(() => {
    let interval = null;
    if(timeLeft <= 0) {
      console.log("VISBILITY: ", isVisible);
      setStartTimer(false);
      setTimeLeft(countdown);
      setIsVisible(false);
      stopRecording();
      getTranscription();
    }
    else if(timeLeft > 0 && isVisible) {

      console.log(timeLeft);
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft-1);
      }, 1000);
    }
    return () => clearInterval(interval);
    
  }, [timeLeft, startTimer]);


  const exitSpeech = () => {
    setIsVisible(false)
  }
  


  return (
    <Modal 
      visible={isVisible}
      transparent={true}
      animationType="slide"
      key={visible}
    >
      <View style={{...styles.modalContainer}}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitleText}>{modalTitle}</Text>
          <VolumeIcon isVisible={isVisible}/>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{timeLeft}</Text>
          </View>
          <TouchableHighlight
            style={{...styles.closeButton}}
            onPress={() => exitSpeech()}
            >
              <Text style={globalStyles.text}>Close</Text>
          </TouchableHighlight>
        </View>       
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
    maxWidth: 330,
  },
  modalView: {
    backgroundColor: globalColors.modalBlue,
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
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  speakerIcon: {
    marginVertical: 10
  },
  countdownContainer: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 4,
    borderRadius: 4
  },
  countdownText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: globalColors.white,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(72, 145, 217, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 6,
    elevation: 1,
  },
}) 

export default SpeechModal;

