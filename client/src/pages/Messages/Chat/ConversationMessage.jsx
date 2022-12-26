import React from "react"

import {MyContext} from '../../../App.jsx'
import { MessageController } from "../../../controllers";
import { convertTime } from "../../../utils/convertTime.js";

export function ConversationMessage( {id, setSelectedMessages, selectedMessages} ) {
    const { userInfo } = React.useContext(MyContext)

    const [message, setMessage] = React.useState();
    const [time, setTime] = React.useState();

    React.useEffect(() => {
        MessageController.get(id, setMessage);
    }, [])
    
    React.useEffect(() => {
        if(message && message.hasOwnProperty('createdAt')) setTime(convertTime(message.createdAt))
    }, [message])

    const selectMessage = () => {
        if(selectedMessages.includes(message._id)) {
            return setSelectedMessages(prev => prev.filter(el => el !== message._id))
        }
        setSelectedMessages(prev => [...prev, message._id])
    }

    return (
        message
        ?
            message.sender === userInfo._id 
            ?
            <div className={`conversation-message-my ${selectedMessages.includes(message._id) ? 'conversation-message-my--selected' : ''}`} onClick={selectMessage}>
                <div className="conversation-message-my__time">{time ? `${time[0]}:${time[1]}` : ''}</div>
                <div className="conversation-message-my__content conversation-message-my--theme">
                    <div className="conversation-message-my__text">{message.text}</div>
                </div>
            </div>
            : 
            <div className={`conversation-message-guest ${selectedMessages.includes(message._id) ? 'conversation-message-guest--selected' : ''}`} onClick={selectMessage}>
                <div className="conversation-message-guest__content conversation-message-guest--theme">
                    <div className="conversation-message-guest__text">{message.text}</div>
                </div>
                <div className="conversation-message-guest__time">{time ? `${time[0]}:${time[1]}` : ''}</div>
            </div>
        :
            'loading...'
    )
}