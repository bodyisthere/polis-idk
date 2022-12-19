import React from "react"

import { MyContext } from "../../App.jsx"
import { GuestPage, Page } from "../index.js"
import NoUser from "./NoUser.jsx";

import { UserController } from "../../controllers/index.js";


export function Pages() {
    const { userInfo, setGuest, guest } = React.useContext(MyContext)
    
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const idURL = window.location.pathname.split('/')[2];
        if(idURL !== userInfo._id) {
            UserController.getPageInfo(idURL, setGuest, setIsLoading, setError);
        } else {
            setIsLoading(false);
        }
    }, [window.location.pathname])

    return (
        isLoading 
        ?
            <div className="loader"></div>
        :
            window.location.pathname.split('/')[2] === userInfo._id
            ?
            <Page/>
            :
            guest 
                ? 
                <GuestPage/>
                :
                error ? <NoUser /> : <div className="loader"></div>
    )
}
