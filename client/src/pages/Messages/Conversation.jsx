import React from "react"
import { useNavigate, Link } from "react-router-dom";

import { MyContext } from "../../App"
import { getPageInfo } from "../../utils/getPageInfo";
import ConversationMessage from "./ConversationMessage";

export function Conversation() {
    const { guest, userInfo, setIsPopOpen, setPopMessage, setGuest, isConnected, socket } = React.useContext(MyContext);

    const [ isLoading, setIsLoading ] = React.useState(true);
    const [msg, setMsg] = React.useState('');
    const [messages, setMessages] = React.useState('');

    const navigate = useNavigate();
    const goTo = () => navigate(`/`);

    React.useEffect(() => {
        if(!userInfo) goTo();
        async function fetchData() {
            const action = 'dialogue'
            const guestInfo = await guest ? setIsLoading(false) : await getPageInfo(setGuest, setIsPopOpen, setPopMessage, '', setIsLoading, action);
        }
        fetchData();
    }, [])

    return (
        isLoading 
        ?
        <div className="loader"></div>
        :
        <div className="conversation">
            <div className="conversation__container">
                <div className="conversation__top">
                    <Link to={`/page/${guest._id}`}>
                        <img src={`http://localhost:4444/uploads${guest.avatarUrl}`} alt={guest.fullName} />
                    </Link>
                    <div className="conversation__top-name">{guest.fullName}</div>
                </div>
                {isConnected ? <div className="conversation__connection conversation__connection--green">Соединение установлено</div> : <div className="conversation__connection conversation__connection--red">Соединение не установлено</div>}
                <div className="conversation__body">
                    {messages?.length >= 1 ? messages.map((el, index) => <ConversationMessage {...el} key={index}/>) : <div className="conversation__no-message">Сообщений нет😞</div>}
                </div>
                <div className="conversation__form">
                    <textarea type="text" placeholder="Введите сообщение" value={msg} onChange={((e) => setMsg(e.target.value))}/>
                    <button className="conversation__send"><i className="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )
}

