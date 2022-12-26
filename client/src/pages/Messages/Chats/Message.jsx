import React from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../App.jsx';

import { getOneDialogue } from '../../../socket/socket.js';

function Message( {id} ) {

    const { socket, userInfo } = React.useContext( MyContext )

    const [ currentDialogue, setCurrentDialogue ] = React.useState();
    const [index, setIndex] = React.useState('')

    React.useEffect(() => {
        getOneDialogue(socket, id);
        socket.current.on('recieve-one-dialogue', (dialogue) => {
            setCurrentDialogue(dialogue)
        })
    }, [])
    
    React.useEffect(() => {
        if(currentDialogue)
        currentDialogue.members.forEach((el, index) => {
            if(el._id === userInfo._id) return
            setIndex(index)
        })
    }, [currentDialogue])

    return (
        currentDialogue && index
        ?
        <Link to={`/conversation/${currentDialogue._id}`}>
            <div className="message">
                <img src={`http://localhost:4444/uploads/${currentDialogue.members[index].avatarUrl}`} alt={currentDialogue.members[index].fullName} className="message__avatar" />
                <div className="message__text">
                    <div className="message__name">{currentDialogue.members[index].fullName}</div>
                    <div className="message__inner">...</div> 
                </div>
            </div>
        </Link>
        :
        ''
    )
}

export default Message;