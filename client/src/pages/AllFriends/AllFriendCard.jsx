import React from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

function AllFriendCard( {fullName, avatarUrl, _id, me}) {
    const { userInfo, setUserInfo, setIsPopOpen, setPopMessage } = React.useContext(MyContext)

    const toggleFriend = async () => {
        const res = await fetch(`http://localhost:4444/friend/${_id}`, {
          method: 'put',
          headers: {
            authorization: localStorage.getItem('token'),
          }
        });
        if(!res.ok) {
            const json = await res.json();
            setPopMessage(json?.message ? json.message : 'Не удалось');
            setIsPopOpen('declined');
            return setTimeout(() => setIsPopOpen(false), 5000)
        }

        let {friendList, ...other} = userInfo;
        friendList = friendList.filter(el => el._id !== _id)
        setUserInfo({friendList, ...other})
        
        setIsPopOpen('success');
        return setTimeout(() => setIsPopOpen(false), 5000)
    }

    return (
        <div className="all-friends__friend">
            <Link className="all-friends__friend-info" to={`/page/${_id}`}>
                <img src={`http://localhost:4444/uploads/${avatarUrl}`} alt={fullName} className="all-friends__friend-avatar"></img>
                <div className="all-friends__friend-name">{fullName}</div>
            </Link>
            {me ? <button className="all-friends__friend-remove" onClick={toggleFriend}>-</button> : ''}
        </div>
    )
}

export default AllFriendCard;