import React from "react";

import { MyContext } from "../../App";
import Friend from "./Friend";

export function GuestFriendsList() {
    const { guest } = React.useContext(MyContext)
    
    return (
        <div className="friends-list">
          <div className="friends-list__title">Список друзей</div>
            {
                guest 
                ? 
                <ul className="friends-list__list">
                  {guest.friendList.length > 0 ? guest.friendList.map(el => <Friend {...el} key={el._id}/>) : 'Друзей пока нет'}
                  <li className="friends-list__all">Посмотреть всех</li>
                </ul> 
                : 
                'Skeleton'   
            }
        </div>
      );
}