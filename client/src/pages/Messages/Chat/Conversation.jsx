import React from "react"
import { useNavigate, Link } from "react-router-dom";

import { MyContext } from '../../../App.jsx'
import { UserController, ConversationController, MessageController } from "../../../controllers";
import { ConverstaionButtons } from "./ConversationButtons.jsx";
import { ConversationMessage } from "./ConversationMessage.jsx";

export function Conversation() {
    const { guest, userInfo, setGuest, socket } = React.useContext(MyContext);

    const [text, setText] = React.useState('');
    const [messages, setMessages] = React.useState('');
    const [selectedMessages, setSelectedMessages] = React.useState([]);
    const [conversation, setConversation] = React.useState('');

    const [isButtonsOpen, setIsButtonsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

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
    
    function sendMessage() {
        MessageController.create(conversation._id, text);
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
                    <ConverstaionButtons selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages} conversation={conversation}></ConverstaionButtons >
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
                        return <ConversationMessage id={el} key={index} selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages}/>
                    }) 
                    :
                    <div className="conversation__no-message">Сообщений нет😞</div>
                    }
                </div>
                <div className="conversation__form">
                    <textarea type="text" placeholder="Введите сообщение" value={text} onChange={((e) => setText(e.target.value))}/>
                    <button className="conversation__send" onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )
}

