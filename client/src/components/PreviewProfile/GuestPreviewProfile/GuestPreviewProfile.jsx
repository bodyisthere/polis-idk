import React from "react";
import { Link } from 'react-router-dom'

import { MyContext } from "../../../App";
import { isTheyFriend } from "../../../utils/isTheyFriend";
import { SocketController, UserController } from "../../../controllers";


function GuestPreviewProfile() {
    const { guest, setIsPopOpen, userInfo, setGuest, socket, userOnline, setUserOnline } = React.useContext(MyContext);

    const [inActive, setInActive] = React.useState('');
    const [isFriend, setIsFriend] = React.useState(() => isTheyFriend(userInfo, guest));

    React.useEffect(() => {
      SocketController.getOnlineUser(socket, [guest._id]);
    }, [])
    
    const friendActions = async () => {
      UserController.toggleFriend(setInActive, guest, setGuest, userInfo, setIsPopOpen);
      SocketController.toggleFriend(guest._id, isFriend ? 'delete' : 'add', socket);
      setIsFriend(!isFriend);
    }

    return (
      guest 
        ?
        <div className="preview-profile">
          <div className="preview-profile__background">
            <img src={`http://localhost:4444/uploads/${guest.avatarUrl}`} alt={guest.fullName}/>
          </div>
          <div className="preview-profile__avatar">
            <img src={`http://localhost:4444/uploads/${guest.avatarUrl}`} alt={guest.fullName}/>
            {
              userOnline.includes(guest._id)
              ?
              <span title='В сети' className="preview-profile__online"></span>
              :
              ''
            }
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
            <Link to={`/conversation/`} className="preview-profile__send-message">Отправить сообщение</Link>
          </div>
        </div>
        : 
        'skeleton preview'
    )
}

export default GuestPreviewProfile;