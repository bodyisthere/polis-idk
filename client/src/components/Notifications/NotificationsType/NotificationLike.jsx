import React from "react";

import { MyContext } from "../../../App";

export function NotificationLike( { post, fullName, avatar, postCover } ) {
    const { openPost } = React.useContext(MyContext);

    return (
        <li className="notifications__item" onClick={() => openPost(post)}>
            <img src={`http://localhost:4444/uploads/${avatar}`} alt={fullName} className="notifications__avatar"></img>
            <div className="notifications__text">
                {fullName} лайкнул ваш пост
                <img src={`http://localhost:4444/uploads/${postCover}`} alt={fullName} className="notifications__cover"></img>
            </div>
        </li>
    )
}