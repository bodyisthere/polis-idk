import { Link } from "react-router-dom"

export function NotificationAddFriend( { id, avatar, fullName } ) {
    return (
        <Link to={`/page/${id}`}>
            <li className="notifications__item" >
                <img src={`http://localhost:4444/uploads/${avatar}`} alt={fullName} className="notifications__avatar"></img>
                <div className="notifications__text">
                    {fullName} добавил вас в друзья
                </div>
            </li>
        </Link>
    )
}