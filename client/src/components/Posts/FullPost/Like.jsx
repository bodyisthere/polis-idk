import React from "react";

import { MyContext } from "../../../App.jsx";
import { PostController, SocketController } from "../../../controllers/index.js";


function Like( {postInfo, setPostInfo}) {
    const { userInfo, socket } = React.useContext(MyContext);

    const [likeCondition, setLikeCondition] = React.useState('');
    const [userId, setUserId] = React.useState('')

    React.useEffect(() => {
        if(!userInfo) return
        setLikeCondition(postInfo.post?.likes.includes(userInfo._id) ? 'delete like' : 'set like' );
        setUserId(userInfo._id);
    }, [userInfo])

    const toggleLike = (id, socket) => {
        PostController.toggleLike(id, postInfo, setLikeCondition, setPostInfo);
        SocketController.like(id, likeCondition, socket);
    }


    return (
        <div className="full-post__button">
            <i 
                className={`fa-regular fa-heart ${postInfo.post?.likes.includes(userId) ? 'post__button-clicked' : ''}`} 
                onClick={() => toggleLike(postInfo.post._id, socket)}></i>
            <span>
                {postInfo.post.likes.length}
            </span>
        </div>
    )
}

export default Like;