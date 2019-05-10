import React, { Component } from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import chatIconUrl from './../../assets/chat-icon.svg'
import ButtonMessage from './ButtonMessage'
import ImageMessage from './ImageMessage'

class Message extends Component {

  _renderMessageOfType(type) {
    switch(type) {
      case 'text':
        return <TextMessage {...this.props.message} />
      case 'emoji':
        return <EmojiMessage {...this.props.message} />
      case 'file':
        return <FileMessage {...this.props.message} />
      case 'button':
        return <ButtonMessage message={this.props.message}  onButtonClicked={this.props.onButtonClicked.bind(this)} userId={this.props.userId}/>
      case 'image':
        return <ImageMessage {...this.props.message} />
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`)
    }
  }

  render () {
    let contentClassList = [
      "sc-message--content",
      // (this.props.message.author === "me" ? "sent" : "received")
      (this.props.message.username === "bot" ? "received" : "sent")
    ];
    return (
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          <div className="sc-message--avatar" style={{
            backgroundImage: `url(${chatIconUrl})`
          }}></div>
          {this._renderMessageOfType(this.props.message.message.type)}
        </div>
      </div>)
  }
}

export default Message