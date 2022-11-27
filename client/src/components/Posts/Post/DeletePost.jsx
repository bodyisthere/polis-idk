import React from "react";

import { MyContext } from "../../../App";

function DeletePost( {postInfo}) {
    const { userInfo, setPopMessage, setIsPopOpen, setUserInfo } = React.useContext(MyContext)

    const deletePost = async (id) => {
        const res = await fetch(`http://localhost:4444/posts/${id}`, {
          method: 'delete',
          headers: {
            authorization: localStorage.getItem('token')
          }
        });
    
        if(!res.ok) {
          setPopMessage('Не удалось удалить пост');
          setTimeout(() => setIsPopOpen(false), 5000)
          return setIsPopOpen('declined');
        }
    
        const json = await res.json();
    
        let { posts, ...other } = userInfo;
    
        for(let i = 0; i < posts.length; i++) {
          posts = posts.filter(el => el !== json.postId);
        }
        
        setUserInfo({
          ...other,
          posts
        })
        setIsPopOpen('success');
        setTimeout(() => setIsPopOpen(false), 5000);
    } 
    return (
        <button className="post__button" title="Удалить пост" onClick={() => deletePost(postInfo.post._id)}><i className="fa-solid fa-trash"></i></button>
    )
}

export default DeletePost;