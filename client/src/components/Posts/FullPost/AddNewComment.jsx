import React from "react";

import { MyContext } from '../../../App.jsx'
import { PostController } from '../../../controllers/index.js'

function AddNewComment( { postInfo, setPostInfo } ) {
    const { setPopMessage, setIsPopOpen } = React.useContext(MyContext);

    const [commentInput, setCommentInput] = React.useState('');

    const onClick = () => {
        const id = postInfo.post._id;
        PostController.addNewComment(id, commentInput, postInfo, setPostInfo, setCommentInput, setPopMessage, setIsPopOpen)
    }

    return (
        <div className="full-post__add-comment">
            <textarea type='text' className="full-post__input" placeholder='Напишите ваш коммент' value={commentInput} onChange={e => setCommentInput(e.target.value)}/>
            <button className="full-post__comment-send" onClick={onClick}>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    )
}

export default AddNewComment;