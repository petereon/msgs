
import { Option, pipe } from 'effect'
import React, { useEffect, useRef } from 'react'
import { useGlobalStore } from '../../stores/global-store'
import { useMessagePaneStore } from '../../stores/message-pane-store'
import Message from '../../types/message'
import User from '../../types/user'
import { doIfSome, hash, makeTempId } from '../../utils/f'

// TODO:  It would be better to deal with image object directly rather than string and then only appending
const createNewMessage: (body: string, sender: User, images: string[]) => Message = (body, sender, images) => ({
  id: makeTempId(hash(`${body}${sender.handle}`)),
  sender: sender,
  body: body,
  images: images,
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
      Option.fromNullable,
      doIfSome(
        (field) => {
          field.textContent = ''
        }
      )
    )
  }



  const appendMessageIfUser = () => Option.match(userOption, {
    onNone: () => console.log('no user'),
    onSome: (user) => appendMessage(createNewMessage(currentMessage, user, []))
  })



  const getProperString = (value: string | null) => Option.getOrElse(Option.fromNullable(value), () => '')

  useEffect(() => pipe(
    textField.current,
    Option.fromNullable,
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
