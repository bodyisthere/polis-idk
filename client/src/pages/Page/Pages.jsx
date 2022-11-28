import React from "react"
import { useNavigate } from "react-router-dom";

import { MyContext } from "../../App.jsx"
import { GuestPage, Page } from "../index.js"
import NoUser from "./NoUser.jsx";


export function Pages() {
    const { userInfo, setGuest, guest } = React.useContext(MyContext)
    
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [error, setError] = React.useState(false);

    const navigate = useNavigate()
    const goTo = (url) => navigate(url);

    React.useEffect(() => {
        if(window.location.pathname.split('/')[2] !== userInfo._id)
        fetch(`http://localhost:4444/page/${window.location.pathname.split('/')[2]}`)
        .then(data => {
            if(!data.ok) {
                throw new Error('Пользователь не найден')
            }
            return data.json()
        })
        .then(json => {
            setGuest(json); 
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err);
            setError(true);
        })
    }, [window.location.pathname])

    return (
        isLoading 
        ?
            <div className="loader"></div>
        :
            window.location.pathname.split('/')[2] === userInfo._id
            ?
            <Page />
            :
            guest 
                ? 
                <GuestPage />
                :
                error ? <NoUser /> : <div className="loader"></div>
    )
}
