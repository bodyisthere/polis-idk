import React from 'react'

import './Messages.scss'

import { getAllMessages } from '../../socket/socket'
// import { getAllMessages } from '../../http/http'
import Message from './Message.jsx'
import { MyContext } from '../../App.jsx'

export function Messages() {

  const { socket, messages, setMessages } = React.useContext(MyContext)

  React.useEffect(() => {
    getAllMessages(socket);
  }, [])

  return (
    <div className="messages">
      <div className="messages__container">
        <div className="messages__title">Ваши сообщения</div>
        <div className="messages__list">
          { 
            messages 
            ?
              messages.map((el, index) => {
                return <Message id={el} key={index}/>
              })
            : 
            ''
          }
        </div>
      </div>
    </div>
  )
}


