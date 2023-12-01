import { create } from 'zustand'
import Message from '../types/message'

import { mockMessages } from './mock-data'

interface MessagePaneState {
    messages: Message[],
    textFieldContent: string,
    updateCurrentMessage: (message: string) => void
}

export const useMessagePaneStore = create<MessagePaneState>((set) => ({
    messages: [
        ...mockMessages
    ],
    textFieldContent: '',
    updateCurrentMessage: (message: string) => set(() => ({ textFieldContent: message })),
}))
