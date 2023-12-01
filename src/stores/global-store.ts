import * as O from 'fp-ts/Option'
import { findFirst } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import { create } from 'zustand'
import { Conversation } from '../types/conversation'
import Message from '../types/message'
import User from '../types/user'
import { mockConverations } from './mock-data'

enum Action {
    Append,
    Remove
}

interface GlobalState {
    user: O.Option<User>,
    conversations: Conversation[],
    currentConversation: O.Option<Conversation>,
    setUser: (user: User) => void,
    clearUser: () => void,
    setCurrentConversation: (conversation: Conversation) => void
    appendMessage: (message: Message) => void,
    deleteMessage: (message: Message) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
    user: O.some({
        id: 5,
        handle: 'test',
        displayName: 'Test User',
        avatar: 'https://picsum.photos/200/300'
    }),
    conversations: [
        ...mockConverations
    ],
    currentConversation: O.some({
        ...mockConverations[0]
    }),


    setUser: (user: User) => set(() => ({ user: O.some(user) })),
    clearUser: () => set(() => ({ user: O.none })),
    setCurrentConversation: (conversation: Conversation) => set(() => ({ currentConversation: O.some(conversation) })),
    appendMessage: (message: Message) => set((state) => (getUpdatedConversationsState(state, message, Action.Append))),
    deleteMessage: (message: Message) => set((state) => (getUpdatedConversationsState(state, message, Action.Remove))),
}))


function getUpdatedConversationsState(state: GlobalState, message: Message, action: Action): GlobalState | Partial<GlobalState> {
    return pipe(
        state.currentConversation,
        O.fold(
            () => state,
            (conversation) => {
                const newConversations = updateConversations(state, conversation.id, message, action)
                return ({
                    currentConversation: findFirst<Conversation>(c => c.id === conversation.id)(newConversations),
                    conversations: newConversations
                })
            })
    )
}

function updateConversations(state: GlobalState, id: number, message: Message, action: Action): Conversation[] {
    if (action === Action.Remove) {
        return state.conversations.map(c => c.id === id ? ({
            ...c,
            messages: removeMessageFromConversation(c, message)
        }) : c)
    } else if (action === Action.Append) {
        return state.conversations.map(c => c.id === id ? ({
            ...c,
            messages: appendMessageToConversation(c, message)
        }) : c)
    }
    return state.conversations
}

function appendMessageToConversation(c: Conversation, message: Message): Message[] {
    return [...c.messages, message]
}

function removeMessageFromConversation(c: Conversation, message: Message): Message[] {
    return c.messages.filter(m => m.id !== message.id)
}
