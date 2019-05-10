import React, { Component } from 'react';
import Nav from './components/nav/Nav.jsx'
import Header from './components/header/Header.jsx';
import OurServices from './components/ourservices/OurServices.jsx'
import Portfolio from './components/portfolio/portfolio';
import Footer from './components/footer/footer';
import ContactUs from './components/contactus/contactus';
import resumeData from '../resumeData';
import ninesenseData from '../ninesenseData'
import { library } from '@fortawesome/fontawesome-svg-core';
import { Launcher } from './components/chat';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import messageHistory from './messageHistory'
import { sleep, uuidv4 } from './components/chat/utils'
import './App.css';
library.add(faIgloo);


const USERID_STORAGE_KEY = "simple-chatroom-cid";
class App extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 1,
      isOpen: false,
      userId: '',
    };


  }

  componentDidMount() {
    let sessionUserId = window.sessionStorage.getItem(USERID_STORAGE_KEY);
    // const isNewSession = sessionUserId == null;

    // if (isNewSession) {
    //   sessionUserId = uuidv4();
    //   window.sessionStorage.setItem(USERID_STORAGE_KEY, sessionUserId);
    // }
    sessionUserId = uuidv4();
    this.setState({
      userId: sessionUserId
    })
  }
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: "me",
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    })
  }

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }


  async poll() {
    while (this._isMounted) {
      try {
        if (this.state.isOpen) {
          await this.fetchMessages();
        }
      } catch (err) {
        // pass
      }
      await sleep(this.props.pollingInterval);
    }
  }

  render() {
    return (
      <div className="App">
        <Nav navData={ninesenseData.navData}/>
        <Header carouselItems={ninesenseData.carouselItems}/>
        <OurServices 
          ourServicesItems={ninesenseData.ourServicesItems}
          ourservice={ninesenseData.ourServicesTitle}
          ourservicesDescrption={ninesenseData.ourServicesDescription}
        />
        {/*<Portfolio resumeData={resumeData}/>
        <ContactUs resumeData={resumeData}/> */}
        <Launcher
          agentProfile={{
            teamName: 'Chat with a bot.',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
            welcomMessage: 'What can I do for you!'
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          onFilesSelected={this._onFilesSelected.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
          showEmoji
          userId={this.state.userId}
          host='http://192.168.1.142:5000'
        />
      </div>
    );
  }
}

export default App;
