import React from 'react'
import { useGlobalStore } from '../../stores/global-store'
import Message from '../../types/message'
import { useOnScreen } from '../../utils/hooks'

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const [isVisible, ref] = useOnScreen()
  const isRead = message.isRead
  const updateMessage = useGlobalStore((state) => state.updateMessage)


  if (isVisible) {
    if (!isRead) {
      setTimeout(() => {
        if (isVisible) {
          updateMessage({ ...message, isRead: true })
        }
      }, 1000)
    }
  }

  return (
    <div className='message' ref={ref}>
      <div className='left-side'>
        <div className='display-name'>{message.sender.displayName}</div>
        <div className='body'>{message.body}</div>
      </div>
      <img className='avatar' src={message.sender.avatar} alt={message.sender.handle} />


    </div>
  )
}

export default MessageItem
