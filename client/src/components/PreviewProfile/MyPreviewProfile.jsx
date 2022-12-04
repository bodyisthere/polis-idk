import React from "react";
import { Link } from "react-router-dom";

import './PreviewProfile.scss'

import { MyContext } from "../../App";
import MyStatus from "./MyStatus";
import { handleChangeFile } from "../../utils/handleChangeFile";

export function MyPreviewProfile() {
    const { userInfo, setUserInfo, setIsPopOpen, setPopMessage } = React.useContext(MyContext);

    const inputFileRef = React.useRef(null);

    const handleChangeAvatar = async (e) => {
      const res = await handleChangeFile(e, 'changeAvatar')
      if(!res.ok) {
        const json = await res.json()
        setPopMessage(json.message);
        setIsPopOpen('declined');
        return setTimeout(() => setIsPopOpen(false), 5000)
      }
      
      const json = await res.json();

      const { avatarUrl, ...other} = userInfo;

        setUserInfo({
          avatarUrl: json.url,
          ...other
        })
        setIsPopOpen('success');
        return setTimeout(() => setIsPopOpen(false), 5000);
    }

    return (
        <div className="preview-profile">
          <div className="preview-profile__background">
            <img src={`http://localhost:4444/uploads/${userInfo.avatarUrl}`} alt={userInfo.fullName}/>
            <div className="preview-profile__background-change">
              <input type="file" name="image" className="preview-profile__file-upload" accept="image/jpeg,image/png" onChange={handleChangeAvatar} ref={inputFileRef} hidden />
              <i title="Изменить аватар" className="fa-solid fa-pen" onClick={() => inputFileRef.current.click()} ></i>
            </div>
          </div>
          <div className="preview-profile__avatar"><img src={`http://localhost:4444/uploads/${userInfo.avatarUrl}`} alt={userInfo.fullName}/>
          </div>
        <div className="preview-profile__username">{userInfo.fullName}</div>
        <div className="preview-profile__status-container">
          <MyStatus />
        </div>
        <div className="preview-profile__info">
          <div className="preview-profile__info-field">Друзья <span>{userInfo.friendList.length}</span></div>
          <div className="preview-profile__info-field">Посты <span>{userInfo.posts.length}</span></div>
        </div>
        <Link to={`/page/${userInfo._id}`} className="preview-profile__my-page">Моя страница</Link>
      </div>)
}
