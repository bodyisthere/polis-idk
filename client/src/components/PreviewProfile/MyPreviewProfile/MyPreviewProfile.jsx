import React from "react";
import { Link } from "react-router-dom";

import '../PreviewProfile.scss'

import { MyContext } from "../../../App";
import MyStatus from "./MyStatus.jsx";
import { MyAvatar } from "./MyAvatar";

export function MyPreviewProfile() {
    const { userInfo } = React.useContext(MyContext);

    return (
        <div className="preview-profile">
          <div className="preview-profile__background">
            <img src={`http://localhost:4444/uploads/${userInfo.avatarUrl}`} alt={userInfo.fullName}/>
            <MyAvatar />
          </div>
          <div className="preview-profile__avatar">
            <img src={`http://localhost:4444/uploads/${userInfo.avatarUrl}`} alt={userInfo.fullName}/>
            <span title="В сети" className="preview-profile__online"></span>
          </div>
        <div className="preview-profile__username">
          {userInfo.fullName}
        </div>
        <div className="preview-profile__status-container">
          <MyStatus />
        </div>
        <div className="preview-profile__info">
          <div className="preview-profile__info-field">
            Друзья <span>{userInfo.friendList.length}</span>
          </div>
          <div className="preview-profile__info-field">
            Посты <span>{userInfo.posts.length}</span>
          </div>
        </div>
        <Link to={`/page/${userInfo._id}`} className="preview-profile__my-page">Моя страница</Link>
      </div>)
}
