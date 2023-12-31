import User from "./user";

export interface IdType {
    id: string,
    isTempId: boolean,
}

export default interface Message {
    id: IdType,
    sender: User,
    body: string,
    images: string[],
    timestamp: Date,
    isRead: boolean,
}
