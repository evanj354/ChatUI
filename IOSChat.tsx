import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import PropTypes from 'prop-types'

interface State {
  // messages: [
  //   {
  //     _id: number,
  //     text: string,
  //     createdAt: Date,
  //     user: {
  //       _id: number,
  //       name: string,
  //     }
  //   }
  // ],
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
    this.setState({
      messages: [
        {
          _id: this.state.msgID,
          text: 'Hello User!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Platica',
          }
        }
      ]
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.generateReply();
   
  }

  generateReply() {
    this.setState(previousState => ({
      
      messages: GiftedChat.append(previousState.messages, 
        {
          _id: this.state.msgID+1,
          text: 'Welcome to Platica!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Platica',
          }
        }
      ),
      msgID: previousState.msgID+1,
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