import { create } from 'zustand'
import Message from '../types/message'

import { mockMessages } from './mock-data'

interface MessagePaneState {
    messages: Message[],
    textFieldContent: string,
    updateCurrentMessageText: (message: string) => void
}

export const useMessagePaneStore = create<MessagePaneState>((set) => ({
    messages: [
        ...mockMessages
    ],
    textFieldContent: '',
    updateCurrentMessageText: (message: string) => set(() => ({ textFieldContent: message })),
}))
