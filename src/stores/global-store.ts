import { Option } from 'effect'
import { findFirst } from 'effect/ReadonlyArray'
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
    user: Option.Option<User>,
    conversations: Conversation[],
    currentConversation: Option.Option<Conversation>,
    setUser: (user: User) => void,
    clearUser: () => void,
    setCurrentConversation: (conversation: Conversation) => void
    appendMessage: (message: Message) => void,
    deleteMessage: (message: Message) => void,
    updateMessage: (message: Message) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
    user: Option.some({
        id: 5,
        handle: 'test',
        displayName: 'Test User',
        avatar: 'https://picsum.photos/200/300'
    }),
    conversations: [
        ...mockConverations
    ],
    currentConversation: Option.some({
        ...mockConverations[0]
    }),


    setUser: (user: User) => set(() => ({ user: Option.some(user) })),
    clearUser: () => set(() => ({ user: Option.none() })),
    setCurrentConversation: (conversation: Conversation) => set(() => ({ currentConversation: Option.some(conversation) })),
    appendMessage: (message: Message) => set((state) => (getUpdatedConversationsState(state, message, Action.Append))),
    deleteMessage: (message: Message) => set((state) => (getUpdatedConversationsState(state, message, Action.Remove))),
    updateMessage: (message: Message) => set((state) => (getUpdatedConversationsState(state, message, Action.Update))),
}))

const getUpdatedConversationsState = (state: GlobalState, message: Message, action: Action): GlobalState | Partial<GlobalState> =>
    Option.match(state.currentConversation, {
        onNone: () => state,
        onSome: (conversation) => {
            const newConversations = getUpdatedCoversations(state, conversation.id, message, action)
            return {
                currentConversation: findFirst(newConversations, c => c.id === conversation.id),
                conversations: newConversations
            }
        }
    }
    )

const getUpdatedCoversations = (state: GlobalState, id: number, message: Message, action: Action): Conversation[] => {
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
