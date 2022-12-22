import React from "react";
import { Link } from "react-router-dom";

import "./Post.scss";

import { FullPost } from "../FullPost/FullPost";
import Like from "../FullPost/Like";
import DeletePost from "./DeletePost";
import { PostController, CommentController } from "../../../controllers";
import { PostText } from "./PostText";
import { PostCover } from "./PostCover";


export function Post( { id } ) {
  const [isPostOpen, setIsPostOpen] = React.useState(false);
  const [postInfo, setPostInfo] = React.useState('');
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    PostController.getPostById(id, setPostInfo);
  }, [])

  React.useEffect(() => {
    if(postInfo?.post?.comments[0]) {
      CommentController.get(postInfo.post.comments[0], setComment);
    }
  }, [postInfo])

  
  const openFullPost = () => {
    setIsPostOpen(true);
  }


  return (
    <div className="post">
      {postInfo 
      ?
      <>
        {isPostOpen ? <FullPost postInfo={postInfo} setPostInfo={setPostInfo} setIsPostOpen={setIsPostOpen}/> : ''}

        <div className="post__author">
          <div className="post__info">
            <Link to={`/page/${postInfo.post.author}`}><img src={`http://localhost:4444/uploads/${postInfo.avatarUrl}`} alt={postInfo.author} /></Link>
            <Link to={`/page/${postInfo.post.author}`}>{postInfo.fullName}</Link>
          </div>
          <DeletePost postInfo={postInfo}/>
        </div>
        <PostText postInfo={postInfo}/>
        <PostCover setIsPostOpen={setIsPostOpen} postInfo={postInfo}/>  
        <div className="post__buttons">
          <div className="post__left">
            <Like postInfo={postInfo} setPostInfo={setPostInfo}/>
            <i className="fa-regular fa-comment" onClick={openFullPost}></i><span>{postInfo.post.comments.length}</span>
            </div>
          <div className="post__right">
            <span>{postInfo.post.viewsCount}</span><i className="fa-regular fa-eye"></i>
          </div>
        </div>
        <div className="post__comments">
          {postInfo.post.comments.length && comment
          ? 
          <div className="post__comment">
            <div className="post__comment-avatar">
              <Link to={`/page/${comment.author._id}`}><img src={`http://localhost:4444/uploads/${comment.author.avatarUrl}`} alt={comment.author.fullName} /></Link>
            </div>
            <div className="post__comment-text">
              <Link to={`/page/${comment.author._id}`}><div className="post__comment-author">{comment.author.fullName}</div></Link>
              <div className="post__comment-text">{comment.text}</div>
            </div>
          </div> 
          : 
          <div className="post__comment-title">Комментариев пока нет, но вы можете быть первым!</div>
          }
          <button className="post__comment-more" onClick={openFullPost}>
            {postInfo.post.comments.length ? 'Посмотреть все комментарии' : 'Добавить первый комментарий'} 
          </button>
        </div>
      </>
      :
      'skeleton'
      }
    </div>
  );
}

