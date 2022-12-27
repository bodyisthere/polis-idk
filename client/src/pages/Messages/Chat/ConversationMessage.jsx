import React from "react"

import {MyContext} from '../../../App.jsx'
import { MessageController } from "../../../controllers";
import { convertTime } from "../../../utils/convertTime.js";

export function ConversationMessage( {id, setSelectedMessages, selectedMessages, messages, setText, setIsEditing, setEditMessageId} ) {
    const { userInfo } = React.useContext(MyContext)

    const [message, setMessage] = React.useState();
    const [time, setTime] = React.useState();

    const editRef = React.useRef();


    React.useEffect(() => {
        if(id === 'deleted') return
        MessageController.get(id, setMessage);
    }, [])

    React.useEffect(() => {
        if(id === 'deleted') {
            setMessage('deleted')
            return setSelectedMessages([])
        }
    }, [messages])
    
    React.useEffect(() => {
        if(message && message.hasOwnProperty('createdAt')) setTime(convertTime(message.createdAt))
    }, [message])
    

    function selectMessage(e) {
        if(e.target === editRef.current) return;
        if(selectedMessages.includes(message._id)) {
            return setSelectedMessages(prev => prev.filter(el => el !== message._id))
        }
        setSelectedMessages(prev => [...prev, message._id])
    }

    function startEditing() {
        setEditMessageId(message._id)
        setIsEditing(true);
        setText(message.text);
    }

    return (
        message
        ?   
            message === 'deleted'
            ? 
                <div className="conversation-message__deleted">Сообщение удалено</div>
            :
                message.sender === userInfo._id 
                ?
                <div className={`conversation-message-my ${selectedMessages.includes(message._id) ? 'conversation-message-my--selected' : ''}`} onClick={selectMessage}>
                    <div className="conversation-message-my__edit" onClick={startEditing}><i className="fa-solid fa-pen" ref={editRef}></i></div>
                    <div className="conversation-message-my__time">{message.isEdited ? `изменено |` : ''}</div>
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
                    <div className="conversation-message-guest__time">{message.isEdited ? `| изменено` : ''}</div>
                </div>
        :
            <div className="loader"></div>
    )
}