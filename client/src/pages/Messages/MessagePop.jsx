import React from 'react'

import audio from '../../assets/audio/messageSound.mp3'

function MessagePop() {
    const notif = React.useRef()

    React.useEffect(() => {
        notif.current.play()
    }, [])

    return (
        <div className="message-pop">
            <audio ref={notif} src={audio} autoPlay></audio>
            {/* <img src="" alt="" className="message-pop__img" /> */}
            <div className="message-pop__img"></div>
            <div className="message-pop__text">
                <div className="message-pop__author">Nikita Ivanov</div>
                <div className="message-pop__msg">Привет!</div>
            </div>
            <div className="message-pop__close"><i className="fa-solid fa-xmark"></i></div>
        </div>
    )
}

export default MessagePop;