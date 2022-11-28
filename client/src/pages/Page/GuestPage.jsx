import GuestPreviewProfile from "../../components/PreviewProfile/GuestPreviewProfile"
import { GuestFriendsList } from "../../components/FriendsList/GuestFriendsList"
import { Posts, Suggestions } from "../../components"

export function GuestPage() {
    return (
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
