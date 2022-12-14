import './Messages.scss'
import { getAllMessages } from '../../http/http'

import Message from './Message.jsx'
import React from 'react'

export function Messages() {

  const [messages, setMessages] = React.useState('')

  React.useEffect(() => {
    getAllMessages(setMessages);
  }, [])

  console.log(messages);


  return (
    <div className="messages">
      <div className="messages__container">
        <div className="messages__title">Ваши сообщения</div>
        <div className="messages__list">
          { 
            messages 
            ?
              messages.map((el, index) => {
                console.log(el)
                return <Message {...el} key={index}/>
              })
            : 
            ''
          }
        </div>
      </div>
    </div>
  )
}


