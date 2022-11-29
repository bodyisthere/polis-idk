import './Messages.scss'

import Message from './Message.jsx'

export function Messages() {
  return (
    <div className="messages">
      <div className="messages__container">
        <div className="messages__title">Ваши сообщения</div>
        <div className="messages__list">
          <Message />
          <Message />
          <Message />
        </div>
      </div>
    </div>
  )
}


