import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Actions } from 'react-native-router-flux';


const { height, width } = Dimensions.get('window');

const Chat = () => {
  let[userInput, editInput] = useState("");
  let[responseList, addResponse] = useState([]);
  let[chatting, checkChatting] = useState(false);

  let messages = responseList.map( (item) => 
    <View key={item}>
      <View style={styles.user}>
        <Text style={[styles.chatMessage, styles.chatMessageUser]}>{item}</Text>
      </View>
      <View style={styles.bot}>
        <Text style={[styles.chatMessage, styles.chatMessageBot]}>I'm Sorry</Text>
      </View>
    </View>
  )

  const handleChat = () =>  {
    addResponse(responseList.concat([userInput]));
    checkChatting(false);
    editInput("");
  }

  return (
    <SafeAreaView style={styles.chatContainer} >
      <View style={{flex: 1}}>
        <ScrollView style={{height: height*.35}}>
          {messages}
        </ScrollView>    
          <View style={styles.chatboxArea}>
            <TextInput
              style={styles.chatbox}
              placeholder={"Type Something"}
              onChangeText={text => editInput(text)}
              onSubmitEditing={() => handleChat()}
              value={userInput}
            /> 
            <View style={styles.buttonStyle}>
            <Button title="chat" onPress={ () => handleChat()}/>
            </View>
          </View>

      </View>
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatArea: {
     
  },
  
  chatContainer: {
    height: height,
    justifyContent: "center",
    
    
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
  chatboxArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  chatbox: {
    width: '50%',
    height: 30,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    margin: 10,
    
  },
  chatboxUp : {
    width: '50%',
    height: 30,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    margin: 10,
    position: 'absolute',
    bottom: 400,
  },

  fixed: {

  },
  moveUp: {
    bottom: 400,
  },

  buttonStyle: {
    paddingTop: 7,
  },
  user: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginVertical: 10,
  },
  bot: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginVertical: 10,
  },
  chatMessage: {
    maxWidth: '57%',
    padding: 10,
    borderRadius: 5,
  },
  chatMessageUser: {
    backgroundColor: 'lightblue',
  },
  chatMessageBot: {
    backgroundColor: 'lightgreen',
  }
})

export default Chat