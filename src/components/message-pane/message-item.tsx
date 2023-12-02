import { Option, fold } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import React from 'react'
import { useGlobalStore } from '../../stores/global-store'
import Message from '../../types/message'
import User from '../../types/user'
import { useOnScreen } from '../../utils/hooks'

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const [isOnScreen, ref] = useOnScreen()
  const isRead = message.isRead
  const updateMessage = useGlobalStore((state) => state.updateMessage)
  const user = useGlobalStore((state) => state.user)


  if (isOnScreen) {
    if (!isRead) {
      setTimeout(() => {
        if (isOnScreen) {
          updateMessage({ ...message, isRead: true })
        }
      }, 1000)
    }
  }

  return (
    <div className={'message-row ' + (isOwnMessage(message, user) ? 'right-align' : '')}>
      <div className='message' ref={ref}>
        <div className='left-side'>
          <div className='display-name'>{message.sender.displayName}</div>
          <div className='body'>{message.body}</div>
        </div>
        <img className='avatar' src={message.sender.avatar} alt={message.sender.handle} />
      </div>
    </div>

  )
}

const isOwnMessage = (message: Message, user: Option<User>) => pipe(
  user,
  fold(
    () => false,
    (user) => message.sender.handle === user.handle
  )
)

export default MessageItem
