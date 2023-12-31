
import { Option } from 'effect'
import { last } from 'effect/ReadonlyArray'
import React from 'react'
import { useGlobalStore } from '../../stores/global-store'
import { Conversation } from '../../types/conversation'



const ConversationItem: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const optional_last_message = last(conversation.messages)
    const setCurrentConversation = useGlobalStore((state) => state.setCurrentConversation)
    const unreadMessageCount = conversation.messages.filter((message) => !message.isRead).length
    return (
        <div className='conversation-item' onClick={() => setCurrentConversation(conversation)}>
            <div className='top'>
                <div className='display-name'>{conversation.name}</div>
                {Option.isSome(optional_last_message) && <div className='timestamp'>{optional_last_message.value.timestamp.toLocaleString()}</div>}

            </div>

            <div className='bottom'>
                <div className='left'>

                    <img className='avatar' src={conversation.avatar} alt={conversation.name} />

                </div>
                <div className='right'>
                    {Option.isSome(optional_last_message) &&
                        <div className='last-message'>
                            <div className='sender'>{optional_last_message.value.sender.displayName}</div>
                            <div className='body'>{optional_last_message.value.body}</div>

                        </div>
                    }
                    {
                        unreadMessageCount > 0 && <div className='unread-message-count'>{unreadMessageCount}</div>
                    }
                </div>
            </div>






        </div>
    )
}

export default ConversationItem
