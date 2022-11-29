import avatar from '../../assets/img/avatar.jpg'

function Message() {
    return (
        <div className="message">
            <img src={avatar} alt="" className="message__avatar" />
            <div className="message__text">
                <div className="message__name">Sasha Ivanov</div>
                <div className="message__inner">Hello! How are you?</div>
            </div>
        </div>
    )
}

export default Message;