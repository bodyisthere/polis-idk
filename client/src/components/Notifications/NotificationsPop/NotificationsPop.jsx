import '../Notifications.scss'

import { NotificationPopMessage } from './NotificationsPopType/NotificationPopMessage.jsx'
import { NotificationPopLike } from './NotificationsPopType/NotificationPopLike.jsx'
import { NotificationPopFriend } from './NotificationsPopType/NotificationPopFriend'

export function NotificationsPop( {notifications, setNotifications} ) {


    console.log(notifications)
    
    return (
        <div className="notifications-pop">
            {
                notifications.map((el, index) => {
                    if(el.action === 'add-friend') {
                        return <NotificationPopFriend key={index} {...el} setNotifications={setNotifications} />
                    }
                    if(el.action === 'send-message') {
                        return <NotificationPopMessage key={index} {...el} setNotifications={setNotifications}/>
                    }
                    if(el.action === 'like') {
                        return <NotificationPopLike key={index} {...el} setNotifications={setNotifications}/>
                    }
                    return '';
                })
            }
        </div>
    )
}