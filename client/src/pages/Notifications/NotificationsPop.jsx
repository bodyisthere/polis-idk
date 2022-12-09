import './Notifications.scss'
import NotificationPop from './NotificationPop'

export function NotificationsPop( {notifications, setNotifications} ) {
    return (
        <div className="notifications-pop">
            {
                notifications.map((el, index) => {
                    return <NotificationPop key={index} {...el} setNotifications={setNotifications} />
                })
            }
        </div>
    )
}