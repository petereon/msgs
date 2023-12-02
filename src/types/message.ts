import { Either } from "fp-ts/lib/Either";
import User from "./user";

export default interface Message {
    id: Either<string, string>,
    sender: User,
    body: string,
    images: string[],
    timestamp: Date,
    isRead: boolean,
}
