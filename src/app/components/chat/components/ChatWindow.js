import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'


class ChatWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: []
    };

  }

  async onUserInputSubmitSend(messageObj, payload?: string) {

    // console.log(messageObj);
    const getParameters = {
      message: messageObj.message.text,
      payload: payload,
      uuid: messageObj.uuid
    };
    const getParametersString = Object.keys(getParameters)
      .filter(k => getParameters[k] != null)
      .map(k => `${k}=${encodeURI(String(getParameters[k]))}`)
      .join("&");

    try {
      await fetch(
        `${this.props.host}/webhooks/chatroom/conversations/${
        this.props.userId
        }/say?${getParametersString}`,
        this.props.fetchOptions
      );
    } catch (error) {
      console.error(error);
      alert("Can't not connect chat server!");
    }

    await this.fetchMessages();
  }

  onFilesSelected(filesList) {
    this.props.onFilesSelected(filesList);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({
      messageList: [{
        username: "bot",
        time: 0,
        message: {
          text: 'Hi, welcome to visit our site!',
          type: "text"
        },
        uuid: "9b9c4e2d-eb7f-4425-b23c-30c25bd7f507"
      }]
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  async fetchMessages() {
    const res = await fetch(
      `${this.props.host}/webhooks/chatroom/conversations/${
      this.props.userId
      }/log?nocache=${Date.now()}`,
      this.props.fetchOptions
    );
    const messages = await res.json();

    // messages.forEach(m => {
    //   m.time = Date.parse(`${m.time}Z`);
    // });
    // await this.setState({
    //   messageList: []
    // });
    // console.log(messages);
    console.log(messages);

    this.setState({
      messageList: [...messages]
    });
    
    // console.log(this.state.messageList);
  }

  tick() {
    // console.log(Date.now());
  }
  render() {
    let classList = [
      "sc-chat-window",
      (this.props.isOpen ? "opened" : "closed")
    ];
    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />
        <MessageList
          messageList={this.state.messageList}
          onButtonClicked={this.onUserInputSubmitSend.bind(this)}
          imageUrl={this.props.agentProfile.imageUrl}
          userId={this.props.userId}
        />
        <UserInput
          onSubmit={this.onUserInputSubmitSend.bind(this)}
          onFilesSelected={this.onFilesSelected.bind(this)}
          showEmoji={this.props.showEmoji}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
}

export default ChatWindow;
