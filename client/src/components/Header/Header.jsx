import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.scss";

import AvatarDrop from './AvatarDrop.jsx'
import FriendSearch from "./FriendsSearch";
import { MyContext } from "../../App";
import logo from "../../assets/img/logo.png";
import { Notifications } from "../Notifications/Notifications";

export function Header() {
  const { userInfo, isAuth } = React.useContext(MyContext);

  const [active, setActive] = React.useState(0);
  const [isDropOpen, setIsDropOpen] = React.useState("");

  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const rootElFirst = React.useRef(null);

  const navigate = useNavigate();
  const goTo = () => navigate(`/`);

  const openSearchWindow = () => {
    setOpenSearch(true);
  }
  
  return (
    isAuth
    ?
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          {openSearch ? <FriendSearch searchValue={searchValue} rootElFirst={rootElFirst} setOpenSearch={setOpenSearch}/> : ''}
          <Link to="/news" className="header__logo">
            <img src={logo} alt="logo" />
          </Link>
          <input type="text" className="header__search" ref={rootElFirst} placeholder="#Explore" value={searchValue} onChange={e => setSearchValue(e.target.value)} onClick={() => openSearchWindow()}/>
        </div>
        <div className="header__right">
          <ul className="header__list">
            <li onClick={() => setActive(0)} className={`header__item ${active === 0 ? "header__item--active" : ""}`}>
              <Link to={userInfo ? `/page/${userInfo._id}` : "/"}>
                <i className="fa-solid fa-house"></i>
              </Link>
            </li>
            <li onClick={() => setActive(1)} className={`header__item ${active === 1 ? "header__item--active" : ""}`}>
              <Link to="/messages">
                <i className="fa-solid fa-envelope"></i>
              </Link>
            </li>
           <Notifications></Notifications>
          </ul>
          {userInfo ? (
            <div className="header__drop">
              <img src={`http://localhost:4444/uploads/${userInfo.avatarUrl}`} alt={userInfo.fullName}/>
              <div className="header__name">{userInfo.fullName}</div>
              <button
                className="header__drop-open"
                onClick={() =>
                  isDropOpen === ""
                    ? setIsDropOpen("header__drop-menu--active")
                    : setIsDropOpen("")
                }
              ></button>
              <AvatarDrop goTo={goTo} isDropOpen={isDropOpen} />
            </div>
          ) : (
            <Link className="header__enter" to="">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
    : ''
  );
}
