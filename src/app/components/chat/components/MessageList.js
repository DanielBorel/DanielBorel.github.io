import React, { Component } from 'react';
import Message from './Messages'

class MessageList extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      messageList: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render () {
    if(this.props.messageList.length) {
      return (
        <div className="sc-message-list" ref={el => this.scrollList = el}>
          {this.props.messageList.map((data, i) => {
            return <Message message={data} key={i} onButtonClicked={this.props.onButtonClicked.bind(this)} userId={this.props.userId}/>
          })}
        </div>)
    } else {
      return (
        <div className="sc-message-list" ref={el => this.scrollList = el}></div>)
    }
  }
}

export default MessageList