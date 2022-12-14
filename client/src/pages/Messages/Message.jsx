import { Link } from 'react-router-dom';

function Message( {members, _id} ) {

    const index = members.indexOf(null) === 0 ? 1 : 0;

    return (
        <Link to={`/conversation/${_id}`}>
            <div className="message">
                <img src={`http://localhost:4444/uploads/${members[index].avatarUrl}`} alt={members[index].fullName} className="message__avatar" />
                <div className="message__text">
                    <div className="message__name">{members[index].fullName}</div>
                    <div className="message__inner">...</div>
                </div>
            </div>
        </Link>
    )
}

export default Message;