import React from "react";

import './FullPost.scss'

import Like from './Like.jsx'
import Comment from './Comment';
import AddNewComment from './AddNewComment.jsx';

import convertDate from "../../../utils/converDate";

export function FullPost( { postInfo, setPostInfo, setIsPostOpen, setIsPostFromOpen } ) {
    return (
        <div className="full-post">
            <div className="full-post__content">
                <div className="full-post__close" onClick={() => {
                    setIsPostOpen(false);
                    if(setIsPostFromOpen) {
                        setIsPostFromOpen(false)
                    }
                    }}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                {postInfo 
                ? 
                <>
                    <div className="full-post__img">
                        <img src={`http://localhost:4444/uploads${postInfo.post.cover}`} alt={postInfo.post.title} />
                    </div>
                    <div className="full-post__text">
                        <div className="full-post__info">
                            <div className="full-post__author-info">
                                <img src={`http://localhost:4444/uploads/${postInfo.avatarUrl}`} alt={postInfo.post.title} />
                                <div className="full-post__author-text">
                                    <div className="full-post__author-name">{postInfo.fullName}</div>
                                    <div className="full-post__date">Опубликовано {convertDate(postInfo.post.createdAt.split('-'))}</div>
                                </div>
                            </div>
                            <div className="full-post__buttons">
                                <Like postInfo={postInfo} setPostInfo={setPostInfo}/>
                                <div className="full-post__button">
                                    <i className="fa-regular fa-comment"></i>
                                    <span>{postInfo.post.comments.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="full-post__comments">
                            {postInfo.post.comments.map((el, index) => <Comment {...el} key={index}/>)}
                        </div>
                        <AddNewComment postInfo={postInfo} setPostInfo={setPostInfo}/>
                    </div>
                </> 
                : 
                'skeleton-fullpost'
                }
            </div>
        </div>
    )
}
