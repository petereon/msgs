import { create } from 'zustand'
import Message from '../types/message'

import { mockMessages } from './mock-data'

interface MessagePaneState {
    messages: Message[],
    currentMessage: string,
    updateCurrentMessage: (message: string) => void
    appendMessage: (message: Message) => void
    deleteMessage: (message: Message) => void
}

export const useMessagePaneStore = create<MessagePaneState>((set) => ({
    messages: [
        ...mockMessages
    ],
    currentMessage: '',
    updateCurrentMessage: (message: string) => set(() => ({ currentMessage: message })),
    appendMessage: (message: Message) => set(state => ({ messages: [...state.messages, message] })),
    deleteMessage: (message: Message) => set(state => ({ messages: state.messages.filter(m => m.id !== message.id) }))
}))