import React from "react";

import './FullPost.scss'

import Like from './Like.jsx'
import Comment from './Comment';
import AddNewComment from './AddNewComment.jsx';
import FullPostSkeleton from './FullPostSkeleton.jsx';

export function FullPost( { postInfo, setPostInfo, setIsPostOpen } ) {
    const correctTime = () => {
        const data = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря',]
        const time = postInfo.post.createdAt.split('-');

        const regexp = new RegExp(/^\d{1,2}/,'gi');

        time[1] = data[time[1]-1];
        time[2] = time[2].match(regexp, ' ').join('');
        time[3] = time[2];
        time[2] = time[0];
        time[0] = time[3] + '';
        time.pop();
        return time.join(" ")
    }
    
    return (
        <div className="full-post">
            <div className="full-post__content">
                <div className="full-post__close" onClick={() => setIsPostOpen(false)}>
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
                                    <div className="full-post__date">Опубликовано {correctTime()}</div>
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
                <FullPostSkeleton />
                }
            </div>
        </div>
    )
}
