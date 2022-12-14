import React from "react";
import { Link } from 'react-router-dom'

import { MyContext } from "../../App";
import { toggleFriend } from "../../http/http";
import { isTheyFriend } from "../../utils/isTheyFriend";
import { toggleFriendSocket } from "../../socket/socket";

function GuestPreviewProfile() {
    const { guest, setIsPopOpen, setPopMessage, userInfo, setGuest, socket } = React.useContext(MyContext);

    const [inActive, setInActive] = React.useState('');
    const [isFriend, setIsFriend] = React.useState(() => isTheyFriend(userInfo, guest));
    
    const friendActions = () => {
      toggleFriend({ setInActive, guest, setIsPopOpen, userInfo, setGuest, setPopMessage });
      toggleFriendSocket(guest._id, isFriend ? 'delete' : 'add', socket);
      setIsFriend(!isFriend);
    }

    return (
      guest ?
        <div className="preview-profile">
          <div className="preview-profile__background">
            <img src={`http://localhost:4444/uploads/${guest.avatarUrl}`} alt={guest.fullName}/>
          </div>
          <div className="preview-profile__avatar">
            <img src={`http://localhost:4444/uploads/${guest.avatarUrl}`} alt={guest.fullName}/>
          </div>
          <div className="preview-profile__username">{guest.fullName}</div>
          <div className="preview-profile__status-container">
            <div className="preview-profile__status" style={{cursor: 'default'}}>{guest?.status ? guest.status : "..."}</div>
          </div>
          <div className="preview-profile__info">
            <div className="preview-profile__info-field">Друзья <span>{guest.friendList.length}</span></div>
            <div className="preview-profile__info-field">Посты <span>{guest.posts.length}</span></div>
          </div>
          <div className="preview-profile__buttons">
            <button className='preview-profile__my-page' disabled={inActive} onClick={friendActions}>{isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}</button>
            <Link to={`/conversation/${guest._id}`} className="preview-profile__send-message">Отправить сообщение</Link>
          </div>
        </div>
        : 'skeleton preview'
    )
}

export default GuestPreviewProfile;