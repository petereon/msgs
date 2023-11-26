import React from 'react'
import Message from '../../types/message'

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className='message'>
      <div className='left-side'>
        <div className='display-name'>{message.sender.displayName}</div>
        <div className='body'>{message.body}</div>
      </div>
      <img className='avatar' src={message.sender.avatar} alt={message.sender.handle} />


    </div>
  )
}

export default MessageItem