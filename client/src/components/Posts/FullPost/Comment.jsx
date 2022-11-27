import { Link } from 'react-router-dom';

import './FullPost.scss'

function Comment( { fullName, avatarUrl, text, _id } ) {
    return (
        <div className="full-post__comment">
                <div className="full-post__comment-avatar">
                    <Link to={`/page/${_id}`}><img src={`http://localhost:4444/uploads/${avatarUrl}`} alt={text} /></Link>
                </div>
                <div className="full-post__comment-text">
                    <Link to={`/page/${_id}`}><div className="full-post__comment-author">{fullName}</div></Link>
                    <div className="full-post__comment-comment">{text}</div>
                </div>
        </div>
    )
}

export default Comment;
