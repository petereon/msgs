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
    Remove,
    Update
}

interface GlobalState {
    user: O.Option<User>,
    conversations: Conversation[],
    currentConversation: O.Option<Conversation>,
    setUser: (user: User) => void,
    clearUser: () => void,
    setCurrentConversation: (conversation: Conversation) => void
    appendMessage: (message: Message) => void,
    deleteMessage: (message: Message) => void,
    updateMessage: (message: Message) => void
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
    updateMessage: (message: Message) => set((state) => (getUpdatedConversationsState(state, message, Action.Update))),
}))


const getUpdatedConversationsState = (state: GlobalState, message: Message, action: Action): GlobalState | Partial<GlobalState> =>
    pipe(
        state.currentConversation,
        O.fold(
            () => state,
            (conversation) => {
                const newConversations = updateConversations(state, conversation.id, message, action)
                return {
                    currentConversation: findFirst<Conversation>(c => c.id === conversation.id)(newConversations),
                    conversations: newConversations
                }
            }
        )
    )

const updateConversations = (state: GlobalState, id: number, message: Message, action: Action): Conversation[] => {
    return state.conversations.map(c => c.id === id ? ({
        ...c,
        messages: actionHandlers[action](c, message)
    }) : c)
}

const actionHandlers = {
    [Action.Append]: (c: Conversation, addedMessage: Message): Message[] => [...c.messages, addedMessage],
    [Action.Remove]: (c: Conversation, removedMessage: Message): Message[] => c.messages.filter(message => message.id !== removedMessage.id),
    [Action.Update]: (c: Conversation, updatedMessage: Message): Message[] => c.messages.map(message => message.id === updatedMessage.id ? updatedMessage : message)
}
