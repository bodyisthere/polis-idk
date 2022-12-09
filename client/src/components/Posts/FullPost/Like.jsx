import React from "react";

import { MyContext } from "../../../App.jsx";


function Like( {postInfo, setPostInfo}) {
    const { userInfo, like } = React.useContext(MyContext);

    const [likeCondition, setLikeCondition] = React.useState(postInfo.post?.likes.includes(userInfo._id) ? 'delete like' : 'set like')

    const toggleLike = (url) => {
        fetch(`http://localhost:4444/post/${url}`, {
            method: 'put',
            headers: {
                authorization: `${localStorage.getItem("token")}`,
            }
        })
        .then(data => data.json())
        .then(json => {
            const { avatarUrl, fullName } = postInfo;
            const { likes, ...post } = postInfo.post;
            setLikeCondition(json.action)
            setPostInfo({
                avatarUrl,
                fullName,
                post: {
                    ...post,
                    likes: json.data,
                }
            })
        })
        like(userInfo._id, postInfo.post._id, likeCondition)
    }

    return (
        <div className="full-post__button">
            <i className={`fa-regular fa-heart ${postInfo.post?.likes.includes(userInfo._id) ? 'post__button-clicked' : ''}`} onClick={() => toggleLike(postInfo.post._id)}></i>
            <span>{postInfo.post.likes.length}</span>
        </div>
    )
}

export default Like;