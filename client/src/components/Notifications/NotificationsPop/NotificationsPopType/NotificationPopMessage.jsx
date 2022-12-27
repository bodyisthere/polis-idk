import React from 'react'
import audio from '../../../../assets/audio/messageSound.mp3'

export function NotificationPopMessage() {
    const sound = React.useRef()

    React.useEffect(() => {
        sound.current.play();
    }, [])

    return (
        <div className="notification-pop">
            <audio src={audio} ref={sound}></audio>
            {/* <img src={`http://localhost:4444/uploads/${avatar}`} alt={fullName} /> */}
            <div className="notification-pop__text">
                {/* <div className="notification-pop__name">{fullName}</div> */}
                <div className="notification-pop__info">отправил вам сообщение!</div>
            </div>
            {/* <div className="notification-pop__close" onClick={() => setNotifications([])}><i className="fa-solid fa-xmark"></i></div> */}
        </div>
    )
}