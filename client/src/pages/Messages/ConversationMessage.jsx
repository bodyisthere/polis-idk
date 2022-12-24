import React from "react"

import { MyContext } from "../../App";
import { MessageController } from "../../controllers";

function ConversationMessage( {id}) {
    const { userInfo } = React.useContext( MyContext );

    const [message, setMessage] = React.useState();

    React.useEffect(() => {
        MessageController.get(id, setMessage);
    }, [])

    console.log(message)

    return (
        <div className="conversation-message">
            <div className="conversation-message__left">
                {/* <div className="conversation-message__author">{author}:</div> */}
                {/* <div className="conversation-message__text">{message}</div> */}
            </div>
            {/* <div className="conversation-message__time">{time}</div> */}
        </div>
    )
}

export default ConversationMessage;