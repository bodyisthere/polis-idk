import { Link } from 'react-router-dom';
import React from 'react';

import './FullPost.scss'
import { MyContext } from '../../../App.jsx'
import { CommentController } from '../../../controllers';


function Comment( { _id, postInfo, setPostInfo } ) {
    const { userInfo, setIsPopOpen } = React.useContext(MyContext);

    const [comment, setComment] = React.useState('');
    const [commentInput, setCommentInput] = React.useState('');
    const [commentEdit, setCommentEdit] = React.useState(false);
    const [author, setAuthor] = React.useState('');

    React.useEffect(() => {
        async function getInfo() {
            const res = await CommentController.get(_id, setComment);
            setAuthor(res.author);
        }
        if(!comment) getInfo()
    }, [])


    const remove = () => {
        CommentController.remove(comment._id, postInfo, setPostInfo, setIsPopOpen)
    }

    const edit = () => {
        setCommentInput(comment.text);
        if(commentEdit && commentInput.length) {
            CommentController.edit(comment._id, {text : commentInput}, setComment, setIsPopOpen);
        }
        setCommentEdit(!commentEdit);
    }


    return (
        comment
        ?
        <div className="full-post__comment">
            <div className="full-post__comment-avatar">
                <Link to={`/page/${author._id}`}><img src={`http://localhost:4444/uploads/${author.avatarUrl}`} alt={author.fullName} /></Link>
            </div>
                <div className="full-post__comment-text">
                    <Link to={`/page/${author._id}`}><div className="full-post__comment-author">{author.fullName}{comment.isEdited ? <span className='full-post__comment-edited'>/изменено</span> : ''}</div></Link>
                    {
                        commentEdit 
                        ?
                        <textarea name="text" className="full-post__comment-textarea" value={commentInput} onChange={e => setCommentInput(e.target.value)}></textarea>
                        :
                        <div className="full-post__comment-comment">{comment.text}</div>
                    }
                </div>    
            

            {
                author._id === userInfo._id
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
