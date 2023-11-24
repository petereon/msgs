import * as O from 'fp-ts/Option'
import { create } from 'zustand'
import User from '../types/user'

interface GlobalState {
    user: O.Option<User>,
}

export const useGlobalStore = create<GlobalState>((set) => ({
    user: O.some({
        id: 5,
        handle: 'test',
        displayName: 'Test User',
        avatar: 'https://picsum.photos/200/300'
    }),
    setUser: (user: User) => set(() => ({ user: O.some(user) })),
    clearUser: () => set(() => ({ user: O.none })),
}))