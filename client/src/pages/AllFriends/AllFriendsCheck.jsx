import React from "react"

import './AllFriends.scss'

import { MyContext } from '../../App.jsx'
import AllGuestFriends from "./AllGuestFriends.jsx"
import AllMyFriends from "./AllMyFriends"

export function AllFriendsCheck() {
    const { userInfo } = React.useContext( MyContext );

    const id = window.location.pathname.split('/')[2];

    return (
        id === userInfo._id
        ?
        <AllMyFriends/>
        : 
        <AllGuestFriends/>
    )
}