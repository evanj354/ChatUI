import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Actions } from 'react-native-router-flux';


const { height, width } = Dimensions.get('window');

const Chat = () => {
  let[userInput, editInput] = useState("");
  let[responseList, addResponse] = useState([]);
  

  let messages = responseList.map( (item) => 
    <View key={item}>
      <View style={styles.user}>
        <Text style={[styles.chatMessage, styles.chatMessageUser]}>{item}</Text>
      </View>
      <View style={styles.bot}>
        <Text style={[styles.chatMessage, styles.chatMessageBot]}>Hello Human</Text>
      </View>
    </View>
  )

  const handleChat = () =>  {
  
    addResponse(responseList.concat([userInput]));
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
  // .message-area {
  //   overflow: hidden;
  // }
  
  // .chatlogs {
  //   max-height: 800px;
  //   overflow-y: scroll;
  // }
  
  // .chatlogs::-webkit-scrollbar {
  //   width: 10px;
  // }
  
  // .chatlogs::-webkit-scrollbar-thumb {
  //   border-radius: 5px;
  //   background: rgba(0,0,0,0.1);
  // }
  
 
  
  // .user {
  //   justify-content: flex-end;
  // }
  
  // .bot {
  //   justify-content: flex-start;
  // }
  
  // .chat .photo {
  //   width: 60px;
  //   height: 60px;
  //   background: grey;
  //   border-radius: 50%;
  //   margin: 10px 10px;
  // }
  
  // .chat .chat-message {
  //   max-width: 57%;
  //   padding: 10px 10px 10px 10px;
  //   border-radius: 5px;
  //   word-wrap: break-word;
  // }
  
  
  
  // .user .chat-message {
  //   background: lightskyblue;
  //   order: -1;
  // }
  
  // .bot .chat-message {
  //   background: lightgreen;
  //   order: 1;
  // }
})

export default Chat