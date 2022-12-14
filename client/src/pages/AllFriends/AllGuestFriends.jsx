import React from "react"

import { MyContext } from "../../App";
import AllFriendCard from "./AllFriendCard";

function AllGuestFriends() {
    const { guest, setGuest } = React.useContext( MyContext );

    const [isOnline, setIsOnline] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`http://localhost:4444/page/${window.location.pathname.split('/')[2]}`)
        .then(data => {
            if(!data.ok) {
                throw new Error('Пользователь не найден')
            }
            return data.json()
        })
        .then(json => {
            setGuest(json); 
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        isLoading
        ? 
        <div className="loader"></div>
        : 
        <div className="all-friends">
            <div className="all-friends__container">
                <ul className="all-friends__menu">
                    <li onClick={() => {setIsOnline(false)}} className={`all-friends__menu-item ${isOnline ? '' : 'all-friends__menu-item--active'}`}><button>{`Все друзья(${guest.friendList.length})`}</button></li>
                    <li onClick={() => {setIsOnline(true)}} className={`all-friends__menu-item ${isOnline ? 'all-friends__menu-item--active' : ''}`}><button>Друзья онлайн</button></li>
                </ul>
                <div className="all-friends__list">
                    {isOnline
                    ? 'в разработке...'
                    : guest.friendList.map(el => <AllFriendCard {...el} key={el._id} me={false}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AllGuestFriends;