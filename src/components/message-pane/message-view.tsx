import React from 'react'
import Message from '../../types/message'

const MessageView: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className='message'>
      <div className='header'>
        <div className='display-name'>{message.sender.displayName}</div>
        <img className='avatar' src={message.sender.avatar} alt={message.sender.handle} />
      </div>

      <div className='body'>{message.body}</div>
    </div>
  )
}

export default MessageView