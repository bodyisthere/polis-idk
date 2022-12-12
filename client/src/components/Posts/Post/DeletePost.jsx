import React from "react";

import { MyContext } from "../../../App";

import { deletePost } from "../../../http/http";

function DeletePost( {postInfo} ) {
    const { userInfo, setPopMessage, setIsPopOpen, setUserInfo } = React.useContext(MyContext);

    const id = postInfo.post._id;

    return (
        <button className="post__button" title="Удалить пост" onClick={() => deletePost(id, setPopMessage, setIsPopOpen, userInfo, setUserInfo)}><i className="fa-solid fa-trash"></i></button>
    )
}

export default DeletePost;