import React, { Component}  from 'react';
import {uuidv4} from '../../utils';

class ButtonMessage extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
    }

    onButtonClick(title: string, payload: string){
        // console.log(title + "  " + payload);
        this.props.onButtonClicked(
            {
            author: 'me',
            type: 'button',
            message: { type: "text", text: title },
            time: Date.now(),
            username: this.props.userId,
            uuid: uuidv4()
            },
            payload);
    }
    render() {
      return (
        <div className="sc-message--buttons">
            {this.props.message.message.buttons.map((data,i) => {
                return <div className="sc-message--button" key={data.title} onClick={() => this.onButtonClick(data.title, data.payload)} >{data.title} </div>
            })}
        </div>
      );
    }
}

export default ButtonMessage;