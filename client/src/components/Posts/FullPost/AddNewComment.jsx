import React from "react";

function AddNewComment( { postInfo, setPostInfo } ) {
    const [commentInput, setCommentInput] = React.useState('');

    const addNewComment = async (url) => {
        const res = await fetch(`http://localhost:4444/post/${url}`, {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({text: commentInput}),
        });

        if(!res.ok) {
            console.log('error')
            return;
        }

        const json = await res.json();

        const { avatarUrl, fullName } = postInfo;
        const { comments, ...post } = postInfo.post;

        setPostInfo({
            avatarUrl,
            fullName,
            post: {
                ...post,
                comments: json.comments,
            }
        })
        setCommentInput('');

        
    }

    return (
        <div className="full-post__add-comment">
            <textarea type='text' className="full-post__input" placeholder='Напишите ваш коммент' value={commentInput} onChange={e => setCommentInput(e.target.value)}/>
            <button className="full-post__comment-send" onClick={() => addNewComment(postInfo.post._id)}>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    )
}

export default AddNewComment;