import * as O from 'fp-ts/Option'
import { create } from 'zustand'
import { Conversation } from '../types/conversation'
import User from '../types/user'
import { mockConverations } from './mock-data'

interface GlobalState {
    user: O.Option<User>,
    conversations: Conversation[],
    currentConversation: O.Option<Conversation>,
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
}))