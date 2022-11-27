import React from "react"

import { MyContext } from "../../App"
import GuestPreviewProfile from "../../components/PreviewProfile/GuestPreviewProfile"
import { GuestFriendsList } from "../../components/FriendsList/GuestFriendsList"
import { Posts, Suggestions } from "../../components"

export function GuestPage() {
    // const { setGuest } = React.useContext(MyContext)

    const [ isLoading, setIsLoading ] = React.useState(false);

    // React.useEffect(() => {
    //     fetch(`http://localhost:4444/page/${window.location.pathname.split('/')[2]}`)
    //     .then(data => data.json())
    //     .then(json => {setGuest(json); setIsLoading(false)})
    //   }, [])

    return (
        // isLoading 
        // ?
        //     'skeleton'
        // :
            <div className="page">
                <div className="page__container">
                    <div className="page__info">
                    <GuestPreviewProfile />
                    <GuestFriendsList />
                    </div>
                    <div className="page__posts">
                    <Posts />
                    </div>
                    <div className="page__suggestions">
                    <Suggestions />
                    </div>
                </div>
            </div>
    )
}
