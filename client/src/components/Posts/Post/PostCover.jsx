import React from "react";

export function PostCover( {setIsPostOpen, postInfo} ) {
    const openFullPost = () => {
        setIsPostOpen(true);
    }

    return (
        postInfo.post.cover
        ?
        <div className="post__img">
            <img src={`http://localhost:4444/uploads${postInfo.post.cover}`} alt={postInfo.title} />
            <img src={`http://localhost:4444/uploads${postInfo.post.cover}`} alt={postInfo.title} onClick={openFullPost}/>
        </div>
        :
        '' 
             
    )
}