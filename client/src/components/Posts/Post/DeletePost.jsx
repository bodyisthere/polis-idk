import React from "react";

import { MyContext } from "../../../App";
import { PostController } from "../../../controllers";

function DeletePost( {postInfo} ) {
    const { userInfo, setPopMessage, setIsPopOpen, setUserInfo } = React.useContext(MyContext);

    
    const onClick = () => {
        const id = postInfo.post._id;
        PostController.deletePost(id, setPopMessage, setIsPopOpen, userInfo, setUserInfo)
    }

    return (
        <button className="post__button" title="Удалить пост" onClick={onClick}>
            <i className="fa-solid fa-trash"></i>
        </button>
    )
}

export default DeletePost;