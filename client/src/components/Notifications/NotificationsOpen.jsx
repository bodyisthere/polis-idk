import React from "react"
import { MyContext } from "../../App.jsx";
import { Link } from "react-router-dom";

    
export default function NotificationsOpen() {

    const { openPost } = React.useContext(MyContext)

    const [ notifications, setNotifications ] = React.useState([])

    React.useEffect(() => {
        if(notifications.length) return;
        fetch('http://localhost:4444/notifications', {
            method: 'get',
            headers: { authorization: localStorage.getItem("token") },
        })
        .then(data => data.json())
        .then(json => setNotifications(json))
    }, [])

    return (
        <>
            <div className="notifications">
                <div className="notifications__title">Уведомления</div>
                <ul className="notifications__list">
                    {
                        notifications.length > 0 
                        ?
                        notifications.map((el, index) => {
                            return (
                                el.action === 'add-friend' 
                                ?
                                <Link to={`/page/${el.id}`} key={index}>
                                    <li className="notifications__item" key={index}>
                                        <img src={`http://localhost:4444/uploads/${el.avatar}`} alt={el.fullName} className="notifications__avatar"></img>
                                        <div className="notifications__text">
                                            {el.fullName} добавил вас в друзья
                                        </div>
                                    </li>
                                </Link>
                                :
                                <li className="notifications__item" key={index} onClick={() => openPost(el.post)}>
                                    <img src={`http://localhost:4444/uploads/${el.avatar}`} alt={el.fullName} className="notifications__avatar"></img>
                                    <div className="notifications__text">
                                        {el.fullName} лайкнул ваш пост
                                        <img src={`http://localhost:4444/uploads/${el.postCover}`} alt={el.fullName} className="notifications__cover"></img>
                                    </div>
                                </li>
                            )
                        })
                        :
                        <div className="notifications__no-notifications">Вы просмотрели все уведомления...</div>
                    }
                </ul>
            </div>
        </>
    )
}