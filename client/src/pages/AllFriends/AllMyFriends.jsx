import React from "react";

import { MyContext } from '../../App.jsx'
import AllFriendCard from "./AllFriendCard";

function AllMyFriends() {
    const { userInfo } = React.useContext( MyContext );

    const [isOnline, setIsOnline] = React.useState(false);

    return (
        <div className="all-friends">
            <div className="all-friends__container">
                <ul className="all-friends__menu">
                    <li onClick={() => {setIsOnline(false)}} className={`all-friends__menu-item ${isOnline ? '' : 'all-friends__menu-item--active'}`}><button>{`Все друзья(${userInfo.friendList.length})`}</button></li>
                    <li onClick={() => {setIsOnline(true)}} className={`all-friends__menu-item ${isOnline ? 'all-friends__menu-item--active' : ''}`}><button>Друзья онлайн</button></li>
                </ul>
                <div className="all-friends__list">
                    {isOnline
                    ? 'в разработке...'
                    : userInfo.friendList.map(el => <AllFriendCard {...el} key={el._id} me={true}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AllMyFriends;