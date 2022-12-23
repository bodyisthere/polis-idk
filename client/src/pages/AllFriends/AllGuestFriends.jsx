import React from "react"

import { MyContext } from "../../App";
import { UserController, SocketController } from "../../controllers";
import AllFriendCard from "./AllFriendCard";

function AllGuestFriends() {
    const { guest, setGuest, userOnline, socket } = React.useContext( MyContext );

    const [isOnline, setIsOnline] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function get() {
            const id = window.location.pathname.split('/')[2];
            const res = await UserController.getPageInfo(id, setGuest, setIsLoading);
            SocketController.getOnlineUser(socket, res.friendList);
        }
        get();
    }, [])


    return (
        isLoading
        ? 
        <div className="loader"></div>
        : 
        <div className="all-friends">
            <div className="all-friends__container">
                <ul className="all-friends__menu">
                    <li onClick={() => {setIsOnline(false)}} className={`all-friends__menu-item ${isOnline ? '' : 'all-friends__menu-item--active'}`}><button>{`Все друзья (${guest.friendList.length})`}</button></li>
                    <li onClick={() => {setIsOnline(true)}} className={`all-friends__menu-item ${isOnline ? 'all-friends__menu-item--active' : ''}`}><button>{`Друзья онлайн (${userOnline.length})`}</button></li>
                </ul>
                <div className="all-friends__list">
                    {isOnline
                    ? 
                    guest.friendList.map(el => {
                        if(userOnline.includes(el._id)) return <AllFriendCard {...el} key={el._id} me={false}/>
                    })
                    : 
                    guest.friendList.map(el => <AllFriendCard {...el} key={el._id} me={false}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AllGuestFriends;