import React from "react"
import { Link } from "react-router-dom";

import { MyContext } from "../../App.jsx";
import { UserController } from "../../controllers/index.js";
import { NotificationAddFriend } from "./NotificationsType/NotificationAddFriend.jsx";
import { NotificationLike } from "./NotificationsType/NotificationLike.jsx";
    
export default function NotificationsOpen() {
    const [ notifications, setNotifications ] = React.useState([]);

    React.useEffect(() => {
        UserController.getNotifications(notifications, setNotifications);
    }, [])

    console.log(notifications)

    const notificationType = (el, index) => {
        if(el.action === 'add-friend') return <NotificationAddFriend key={index} {...el}/>
        if(el.action === 'like') return <NotificationLike key={index} {...el}/>
    }

    return (
        <>
            <div className="notifications">
                <div className="notifications__title">Уведомления</div>
                <ul className="notifications__list">
                    {
                        notifications.length > 0 
                        ?
                        notifications.map((el, index) => {
                            return notificationType(el, index)
                        })
                        :
                        <div className="notifications__no-notifications">Вы просмотрели все уведомления...</div>
                    }
                </ul>
            </div>
        </>
    )
}