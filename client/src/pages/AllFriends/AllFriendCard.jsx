import React from "react";
import { Link } from "react-router-dom";

import { MyContext } from "../../App";
import { UserController } from "../../controllers";


function AllFriendCard( {fullName, avatarUrl, _id, me}) {
    const { userInfo, setUserInfo, setIsPopOpen, setPopMessage } = React.useContext(MyContext);

    const friendActions = async () => {
        UserController.toggleFriendFromList(_id, setIsPopOpen, setPopMessage, userInfo, setUserInfo)
    }

    return (
        <div className="all-friends__friend">
            <Link className="all-friends__friend-info" to={`/page/${_id}`}>
                <img src={`http://localhost:4444/uploads/${avatarUrl}`} alt={fullName} className="all-friends__friend-avatar"></img>
                <div className="all-friends__friend-name">{fullName}</div>
            </Link>
            {me ? <button className="all-friends__friend-remove" onClick={friendActions}>-</button> : ''}
        </div>
    )
}

export default AllFriendCard;