import { fold, fromNullable, getOrElse } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import React, { useEffect, useRef } from 'react'
import { useGlobalStore } from '../../stores/global-store'
import { useMessagePaneStore } from '../../stores/message-pane-store'
import Message from '../../types/message'
import User from '../../types/user'
import { doIfSome, hash, makeTempId } from '../../utils/f'

const createNewMessage: (body: string, sender: User) => Message = (body, sender) => ({
  id: makeTempId(hash(`${body}${sender.handle}`)),
  sender: sender,
  body: body,
  timestamp: new Date(),
  isRead: true,
})

const TextField: React.FC = () => {
  const textField = useRef<HTMLDivElement>(null);

  const currentMessage = useMessagePaneStore((state) => state.textFieldContent)
  const updateCurrentMessage = useMessagePaneStore((state) => state.updateCurrentMessageText)
  const appendMessage = useGlobalStore((state) => state.appendMessage)
  const userOption = useGlobalStore((state) => state.user)

  const submitMessage = () => {
    if (currentMessage === '') return
    appendMessageIfUser()
    updateCurrentMessage('')
    pipe(
      textField.current,
      fromNullable,
      doIfSome(
        (field) => {
          field.textContent = ''
        }
      )
    )
  }

  const appendMessageIfUser = () => pipe(
    userOption,
    fold(
      () => console.log('no user'),
      (user: User) => appendMessage(createNewMessage(currentMessage, user))
    ))


  const getProperString = (value: string | null) => pipe(
    value,
    fromNullable,
    getOrElse(() => ''),
  )

  useEffect(() => pipe(
    textField.current,
    fromNullable,
    doIfSome(
      (field) => {
        field.textContent = currentMessage
      }
    )
  ), [currentMessage]);

  return (
    <div className='text-field-container'>
      <div
        ref={textField}
        className='text-field'
        contentEditable="true" onInput={(e) => updateCurrentMessage(getProperString(e.currentTarget.textContent))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submitMessage()
            e.preventDefault()
          }
        }}
      >

      </div>
      <div className='text-field-button images-button' onClick={submitMessage} />
      <div className='text-field-button' onClick={submitMessage}>+</div>
    </div>


  )
}

export default TextField
