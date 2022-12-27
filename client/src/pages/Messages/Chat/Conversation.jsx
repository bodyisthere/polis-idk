import React from "react"
import { useNavigate, Link } from "react-router-dom";

import { MyContext } from '../../../App.jsx'
import { UserController, ConversationController, MessageController, SocketController } from "../../../controllers";
import { ConverstaionButtons } from "./ConversationButtons.jsx";
import { ConversationMessage } from "./ConversationMessage.jsx";

export function Conversation() {
    const { guest, userInfo, setGuest, socket, conversation, setConversation, messages, setMessages } = React.useContext(MyContext);

    const [text, setText] = React.useState('');
    const [selectedMessages, setSelectedMessages] = React.useState([]);
    const [editMessageId, setEditMessageId] = React.useState('')

    const [isButtonsOpen, setIsButtonsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isEditing, setIsEditing] = React.useState(false);

    const navigate = useNavigate();
    const goTo = () => navigate(`/`);

    React.useEffect(() => {
        if(!userInfo) goTo();

        const guestId = window.location.pathname.split('/')[2];
        
        async function fetchData() {
            if(!guest) {
                await UserController.getPageInfo(guestId, setGuest, setIsLoading);
            }
            setIsLoading(false);
        }
        fetchData();
        ConversationController.createOrGetDialogue(guestId, setMessages, setConversation);
    }, [])
    
    React.useEffect(() => {
        if(selectedMessages.length > 0) return setIsButtonsOpen(true);
        return setIsButtonsOpen(false);
    }, [selectedMessages])
    
    async function sendMessage() {
        if(text.length === 0) return
        const recievedMessage = await MessageController.create(
            conversation.hasOwnProperty('_id') ? conversation._id : conversation.conversationId, 
            text,
            setMessages
        );
        setText('');
        SocketController.sendMessage(socket, recievedMessage, window.location.pathname.split('/')[2]);
    }

    function editMessage() {
        MessageController.edit(editMessageId, text, setMessages);
        setIsEditing(false);
        setText('');
    }

    function cancelEdit() {
        setIsEditing(false);
        setText('');
    }


    return (
        isLoading 
        ?
        <div className="loader"></div>
        :
        <div className="conversation">
            <div className="conversation__container">
                {
                    isButtonsOpen
                    ?
                    <ConverstaionButtons 
                        selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages} 
                        text={text} setText={setText}
                        setMessages={setMessages} 
                        conversation={conversation}
                    >
                    </ConverstaionButtons >
                    :
                    <div className="conversation__top">
                        <Link to={`/page/${guest._id}`}>
                            <img src={`http://localhost:4444/uploads/${guest.avatarUrl}`} alt={guest.fullName} />
                        </Link>
                        <div className="conversation__top-name">{guest.fullName}</div>
                    </div>
                }
                <div className="conversation__body">
                    {
                    messages.length
                    ? 
                    messages.map((el, index) => {
                        return (
                            <ConversationMessage 
                                id={el} key={index} 
                                messages={messages} 
                                selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages}
                                text={text} setText={setText}
                                isEditing={isEditing} setIsEditing={setIsEditing}
                                setEditMessageId={setEditMessageId}
                            />
                        )
                    }) 
                    :
                    <div className="conversation__no-message">Сообщений нет😞</div>
                    }
                </div>
                <div className="conversation__form">
                    <textarea type="text" placeholder="Введите сообщение" value={text} onChange={((e) => setText(e.target.value))}/>
                    {isEditing
                    ?
                        <>
                            <button className="conversation__cancel" onClick={cancelEdit}><i className="fa-solid fa-xmark"></i></button>
                            <button className="conversation__send" onClick={editMessage}><i className="fa-solid fa-check"></i></button>
                        </>
                    :
                        <button className="conversation__send" onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></button>
                }
                </div>
            </div>
        </div>
    )
}

