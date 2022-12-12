import React from "react";

import "./Notifications.scss";

import { MyContext } from "../../App";
import NotificationsOpen from "./NotificationsOpen";

export function Notifications() {
  const { userInfo } = React.useContext(MyContext);

  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
  <li className='header__item'>
    <i className="fa-solid fa-bell" onClick={() => setShowNotifications(!showNotifications)}></i>
    <span className="header__notifications-count">{userInfo.notifications.length}</span>
    {showNotifications ? <NotificationsOpen /> : ''}
  </li>
  )
}

