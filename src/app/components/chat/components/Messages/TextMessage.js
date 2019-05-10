import React from 'react';
import Linkify from 'react-linkify';


const TextMessage = (props) => {
  return <div className="sc-message--text">{
    <Linkify properties={{ target: '_blank' }}>{props.message.text}</Linkify>
  }</div>
}

export default TextMessage
