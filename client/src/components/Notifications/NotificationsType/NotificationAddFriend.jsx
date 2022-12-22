import { Link } from "react-router-dom"

export function NotificationAddFriend( { id, avatar, fullName } ) {
    return (
        <li className="notifications__item-friend" >
            <Link to={`/page/${id}`}>
                <img src={`http://localhost:4444/uploads/${avatar}`} alt={fullName} className="notifications__avatar"></img>
            </Link>
            <div className="notifications__text">
                {fullName} добавил вас в друзья
            </div>
        </li>
    )
}