function ConversationMessage( { author, message, time}) {
    return (
        <div className="conversation-message">
            <div className="conversation-message__left">
                <div className="conversation-message__author">{author}:</div>
                <div className="conversation-message__text">{message}</div>
            </div>
            <div className="conversation-message__time">{time}</div>
        </div>
    )
}

export default ConversationMessage;