import React from "react";

import { addNewComment } from "../../../http/http.js";

function AddNewComment( { postInfo, setPostInfo } ) {
    const [commentInput, setCommentInput] = React.useState('');

    const id = postInfo.post._id;

    return (
        <div className="full-post__add-comment">
            <textarea type='text' className="full-post__input" placeholder='Напишите ваш коммент' value={commentInput} onChange={e => setCommentInput(e.target.value)}/>
            <button className="full-post__comment-send" onClick={() => addNewComment(id, commentInput, postInfo, setPostInfo, setCommentInput)}>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    )
}

export default AddNewComment;