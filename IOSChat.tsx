import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import PropTypes from 'prop-types'

const ec2Endpoint = "http://ec2-54-214-186-4.us-west-2.compute.amazonaws.com:5000";
const hostedUrl = "https://platica-backend.herokuapp.com/";
const serverUrl = "http://10.0.0.150:5000";

interface State {
  messages: any[],
  msgID: number
}


export default class IOSChat extends React.Component<{}, State> {
  state = {
    messages: [],
    msgID: 0,
  }

  constructor(props) {
    super(props);
    this.state = {messages: [], msgID: 0};
    this.onSend = this.onSend.bind(this);
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
      response.json().then(message => {

      }).catch(err => (console.log(err))) 
    )

    this.generateReply(body);
   
  }

  generateReply(body="") {
    console.log(body);
    let order = 0;
    const messagePayload = {body, order};
    fetch(ec2Endpoint+"/generateReply",
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
      response.json().then(message => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, 
            {
              _id: this.state.msgID+1,
              text: message.body,
              createdAt: message.timestamp,
              user: {
                _id: message.order,
                name: 'Platica',
              }
            }
          ),
          msgID: previousState.msgID+1,
        }))
      })) 
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }

}