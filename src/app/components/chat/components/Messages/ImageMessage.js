
import React from 'react';
import FileIcon from '../icons/FileIcon'


const ImageMessage = (props) => {
    return (
        <a className="sc-message--image" >
            <img src={props.message.image}></img>
        </a>
    )
}

export default ImageMessage
