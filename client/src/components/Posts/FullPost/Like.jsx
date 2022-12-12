import React from "react";

import { MyContext } from "../../../App.jsx";

import { like } from "../../../socket/socket.js";
import { toggleLike } from "../../../http/http.js";


function Like( {postInfo, setPostInfo}) {
    const { userInfo, socket } = React.useContext(MyContext);

    const [likeCondition, setLikeCondition] = React.useState('');
    const [userId, setUserId] = React.useState('')

    React.useEffect(() => {
        if(!userInfo) return
        setLikeCondition(postInfo.post?.likes.includes(userInfo._id) ? 'delete like' : 'set like' );
        setUserId(userInfo._id)
    }, [userInfo])

    const toggleLikeE = (id, socket) => {
        toggleLike(id, postInfo, setLikeCondition, setPostInfo)
        like(id, likeCondition, socket)
    }


    return (
        <div className="full-post__button">
            <i 
                className={`fa-regular fa-heart ${postInfo.post?.likes.includes(userId) ? 'post__button-clicked' : ''}`} 
                onClick={() => toggleLikeE(postInfo.post._id, socket)}></i>
            <span>
                {postInfo.post.likes.length}
            </span>
        </div>
    )
}

export default Like;