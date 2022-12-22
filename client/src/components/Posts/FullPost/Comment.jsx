import { Link } from 'react-router-dom';
import React from 'react';

import './FullPost.scss'
import { MyContext } from '../../../App.jsx'
import { CommentController } from '../../../controllers';


function Comment( { _id, postInfo, setPostInfo } ) {
    const { userInfo, setIsPopOpen } = React.useContext(MyContext);

    const [comment, setComment] = React.useState('');

    React.useEffect(() => {
        CommentController.get(_id, setComment);
    }, [])

    const remove = () => {
        CommentController.remove(comment._id, postInfo, setPostInfo, setIsPopOpen)
    }

    const edit = () => {}

    return (
        comment
        ?
        <div className="full-post__comment">
            <div className="full-post__comment-avatar">
                <Link to={`/page/${comment.author._id}`}><img src={`http://localhost:4444/uploads/${comment.author.avatarUrl}`} alt={comment.author.fullName} /></Link>
            </div>
            <div className="full-post__comment-text">
                <Link to={`/page/${comment.author._id}`}><div className="full-post__comment-author">{comment.author.fullName}</div></Link>
                <div className="full-post__comment-comment">{comment.text}</div>
            </div>
            {
                comment.author._id === userInfo._id
                ?
                <div className="full-post__comment-buttons">
                    <button className="full-post__comment-delete" title='Удалить' onClick={remove}><i className="fa-solid fa-trash"></i></button>
                    <button className="full-post__comment-edit" title='Редактировать' onClick={edit}><i className="fa-solid fa-pen-to-square"></i></button>
                </div>
                :
                ''
            }
        </div>
        :
        ''
    )
}

export default Comment;
