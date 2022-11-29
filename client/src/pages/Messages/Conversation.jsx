import React from "react"
import { useNavigate } from "react-router-dom";

import { MyContext } from "../../App"
import ConversationMessage from "./ConversationMessage";

export function Conversation() {
    const { guest } = React.useContext(MyContext);

    const [ isLoading, setIsLoading ] = React.useState(true)

    const navigate = useNavigate();
    const goTo = () => navigate(`/`);


    React.useEffect(() => {
       if(!guest) {
        setIsLoading(false);
        return goTo();
        } else {
        setIsLoading(false)
        }
        console.log(guest._id)
        fetch(`http://localhost:3000/conversation/${guest._id}`)
        .then(data => data.json())
        .then(json => console.log(json))
    }, [])
    
    const [msg, setMsg] = React.useState('')

    return (
        isLoading 
        ?
        <div className="loader"></div>
        :
        <div className="conversation">
            <div className="conversation__container">
                <div className="conversation__top">
                    <img src={`http://localhost:4444/uploads${guest.avatarUrl}`} alt={guest.fullName} />
                    <div className="conversation__top-name">{guest.fullName}</div>
                </div>
                <div className="conversation__body">
                    <ConversationMessage/>
                </div>
                <div className="conversation__form">
                    <textarea type="text" placeholder="Введите сообщение" value={msg} onChange={((e) => setMsg(e.target.value))}/>
                    <button className="conversation__send"><i className="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )
}

