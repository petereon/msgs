import Message from "./message";
import User from "./user";

export interface Conversation {
    id: number,
    name: string,
    avatar: string,
    users: User[],
    messages: Message[],
    unreadMessageCount: number
}