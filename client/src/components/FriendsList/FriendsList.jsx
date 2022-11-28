import React from "react";
import { Link } from "react-router-dom";

import "./FriendsList.scss";

import { MyContext } from "../../App";
import Friend from "./Friend.jsx";


export function FriendsList() {
  const { userInfo } = React.useContext(MyContext);

  return (
    <div className="friends-list">
      <div className="friends-list__title">Список друзей</div>
        {
            userInfo?.friendList.length >= 1 
            ? 
            (
              <ul className="friends-list__list">
                {userInfo.friendList.map((el, index) => index <= 3 ? <Friend {...el} key={el._id}/> : '')}
                <li className="friends-list__all"><Link to={`/all-friends/${userInfo._id}`}>Посмотреть всех</Link></li>
              </ul>
            ) 
            : 
            (
              <div className="friends-list__no-one">
                <div className="friends-list__no">У вас ещё нет друзей. Добавить?</div>
                <button className="friends-list__no-btn">Поиск!</button>
              </div>
            ) 
        }
    </div>
  );
}
