import React from "react";

import { MyContext } from '../../App.jsx'
import AllFriendCard from "./AllFriendCard";
import { SocketController } from "../../controllers";

function AllMyFriends() {
    const { userInfo, socket, userOnline } = React.useContext( MyContext );

    const [isOnline, setIsOnline] = React.useState(false);

    React.useEffect(() => {
        SocketController.getOnlineUser(socket, userInfo.friendList);
    }, [])

    return (
        <div className="all-friends">
            <div className="all-friends__container">
                <ul className="all-friends__menu">
                    <li onClick={() => {setIsOnline(false)}} className={`all-friends__menu-item ${isOnline ? '' : 'all-friends__menu-item--active'}`}><button>{`Все друзья (${userInfo.friendList.length})`}</button></li>
                    <li onClick={() => {setIsOnline(true)}} className={`all-friends__menu-item ${isOnline ? 'all-friends__menu-item--active' : ''}`}><button>{`Друзья онлайн (${userOnline.length})`}</button></li>
                </ul>
                <div className="all-friends__list">
                    {isOnline
                    ? 
                    userInfo.friendList.map(el => {
                        if(userOnline.includes(el._id)) return <AllFriendCard {...el} key={el._id} me={true}/>
                    })
                    : 
                    userInfo.friendList.map(el => <AllFriendCard {...el} key={el._id} me={true}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AllMyFriends;