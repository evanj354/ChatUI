import React, { useState } from 'react';
import { GiftedChat, MessageContainer, Bubble } from 'react-native-gifted-chat'
import PropTypes from 'prop-types'
import { ImageBackground, Modal, View, Text } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Speech from 'expo-speech';
import { globalStyles, globalColors } from './globalStyles/globalStyles';
import SpeechModal from './SpeechModal';

const ec2Endpoint = "http://ec2-54-214-186-4.us-west-2.compute.amazonaws.com:5000";
const hostedUrl = "https://platica-backend.herokuapp.com/";
const serverUrl = "http://10.0.0.150:5000";

const recordingOptions = {
  // android not currently in use, but parameters are required
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
  },
};

interface State {
  messages: any[],
  msgID: number
} 


export default class IOSChat extends React.Component<{}, State> {
  recording: any;
  state = {
    messages: [],
    msgID: 0,
    name: "",
    speechEnabled: false,
    isRecording: false,
    isFetching: false,
    modalVisible: false,
  }
  

  constructor(props) {
    super(props);
    this.recording = null;
    this.state = {messages: [], msgID: 0, name: props.username, speechEnabled: props.speechEnabled, isRecording: false, isFetching: false, modalVisible: props.speechEnabled};
    this.onSend = this.onSend.bind(this);
    this.generateReply = this.generateReply.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onSendSpeech = this.onSendSpeech.bind(this);
    this.resetRecording = this.resetRecording.bind(this);
  }

  
  

  startRecording = async() => {
    this.resetRecording();
    console.log('Enter Recording Area');
    this.setState(previousState => {
      return {
        ...previousState,
        isRecording: true
      }
    });

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });

    const recording = new Audio.Recording()
    try {
      await recording.prepareToRecordAsync(recordingOptions)
      await recording.startAsync();
      console.log('Recording Started');
      let status = await recording.getStatusAsync();
      console.log(status);
    } catch(error) {
      console.log("Start Recording: ", error);
      this.stopRecording();
    }
    this.recording = recording;
  }

  stopRecording = async() => {
    this.setState(previousState => {
      return {
        ...previousState,
        isRecording: false,
        modalVisible: false
      }
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch(error) {
      console.log("Stop Recording Error: ", error);
    }
  }

  getTranscription = async() => {
    console.log('Getting Transcription');
    this.setState(previousState => { 
        return {
          ...previousState,
          isFetching: true 
        }
      }
    );
    try {
      const { uri } = await FileSystem.getInfoAsync(this.recording.getURI());
      console.log(`FILE INFO: ${JSON.stringify(uri)}`);
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/x-wav',
        name: 'speech2text'
      });
      console.log('Getting Data');
      
      const response = await fetch(ec2Endpoint+"/getAudio", {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
      const message = await response.json();
      console.log("BODY: ", message.body);
      this.onSendSpeech(message.body)
    } catch(error) {
      console.log("Error" ,error);
      this.stopRecording();
      this.resetRecording();
    }
    this.setState(previousState => { 
        return {
          ...previousState,
          isFetching: false 
        }
      }
    );
    
  }

  resetRecording = async() => {
    console.log("Deleting file");
    try {
        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        await FileSystem.deleteAsync(info.uri)
    } catch(error) {
        console.log("There was an error deleting recording file", error);
    }
    this.recording = null;
  }

  componentDidMount() {
    fetch(ec2Endpoint+"/pullMessages",
      {
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      }
    ).then(response =>
      response.json().then(messages => {
        var i;
        for(i=0; i<messages.length; i++) {
          this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, 
            {
              _id: i,
              text: messages[i].body,
              createdAt: messages[i].timestamp,
              user: {
                _id: messages[i].order,
                name: 'Platica',
              }
            }
          ),
          msgID: i,
          }))
        }
      })) 
    

  }

  onSendSpeech(message) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, 
        {
          _id: this.state.msgID+1,
          text: message,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Platica',
          }
        }
      ),
      msgID: previousState.msgID+1,
    }))

    let body = message;
    let order = 1;
    const messagePayload = {body, order};
    fetch(ec2Endpoint+"/send",
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(messagePayload)
      }
    ).then(response =>
      response.json().then(json_response => {
        this.generateReply(json_response);
      }).catch(err => (console.log(err))) 
    )
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

   
    let body = messages[0].text;
    let order = 1;
    const messagePayload = {body, order};
    fetch(ec2Endpoint+"/send",
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(messagePayload)
      }
    ).then(response =>
      response.json().then(json_response => {
        this.generateReply(json_response);
      }).catch(err => (console.log(err))) 
    )
  }



  addReply(response, type) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, 
        {
          _id: this.state.msgID+1,
          text: response.body,
          createdAt: response.timestamp,
          user: {
            _id: response.order,
            name: 'Platica',
          }
        }
      ),
      msgID: previousState.msgID+1,
    }))

    if(this.state.speechEnabled && type=='chat') {
      console.log('Chat Response Good');
      Speech.speak(response.body, {onDone: () => {
          if(this.state.speechEnabled) {
            this.setState(previousState => {
              return {
                ...previousState,
                modalVisible: true
              }
            });
          }
      }});
    }
    else if(this.state.speechEnabled) {
      console.log('Chat Response Bad');
      Speech.speak(response.body);
    }
  }

  generateReply(json_response) {
  
    if(json_response.grammar_correction.body != '') {
      this.addReply(json_response.grammar_correction, 'grammar');
    }
    this.addReply(json_response.chatbot_response, 'chat');
  }

  render() {
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            name: this.state.name,
          }}
          renderActions={() => <SpeechModal 
                                  modalTitle="Speak into the Microphone"
                                  countdown={6}
                                  startRecording={this.startRecording}
                                  stopRecording={this.stopRecording}
                                  resetRecording={this.resetRecording}
                                  getTranscription={this.getTranscription}
                                  visible={this.state.modalVisible}
                                  beginTiming={true}
                                  />}
        />
        
          
        
       
    )
  }

}