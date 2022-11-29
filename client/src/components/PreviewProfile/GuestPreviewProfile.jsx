import React from "react";
import { Link } from 'react-router-dom'

import { MyContext } from "../../App";

function GuestPreviewProfile() {
    const { guest, setIsPopOpen, setPopMessage, userInfo, setGuest } = React.useContext(MyContext);

    const [inActive, setInActive] = React.useState('');
    const [friendText, setFriendText] = React.useState('')

    const isTheyFriend = () => {
      let isThey = false;
      const length = userInfo.friendList.length;
      let i = 0;
      
      if(userInfo.friendList.length >= 1) {
        while( !isThey && length >= i + 1) {
          if(userInfo.friendList[i]._id === guest._id) {
            isThey = true;
            return setFriendText('Удалить из друзей');
          }
          i = i + 1;
        }
      }
      if(!isThey) {
        return setFriendText('Добавить в друзья')
      } 
    }
    
    const toggleFriend = () => {
      setInActive(true);
      setTimeout(() => setInActive(false), 2000)
      fetch(`http://localhost:4444/friend/${guest._id}`, {
        method: 'put',
        headers: {
          authorization: localStorage.getItem('token'),
        }
      })
      .then(res => {
        if(!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then(json => {
        setIsPopOpen('success');
        setTimeout(() => setIsPopOpen(false), 5000);
        if(json.message === 'Вы добавили этого человека в друзья') {
          const { friendList, ...other } = guest;
          friendList.push({
            avatarUrl: userInfo.avatarUrl,
            fullName: userInfo.fullName,
            _id: userInfo._id
          })
          setGuest({
            ...other,
            friendList
          })
        }
        if(json.message === 'Вы удалили этого человека из друзей') {
          let { friendList, ...other } = guest;
          friendList = friendList.filter(el => el._id !== userInfo._id)
          setGuest({
            ...other,
            friendList
          })
        }
      })
      .catch(() => {
        setPopMessage('Не удалось удалить/добавить в друзья');
        setIsPopOpen('declined');
        setTimeout(() => setIsPopOpen(false), 5000)
      })
    }

    React.useEffect(() => {
      isTheyFriend()
    }, [guest])

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
            <button className={`preview-profile__my-page`} disabled={inActive} onClick={toggleFriend}>{friendText}</button>
            <Link to={`/conversation/${guest._id}`} className="preview-profile__send-message">Отправить сообщение</Link>
          </div>
        </div>
        : 'skeleton preview'
    )
}

export default GuestPreviewProfile;