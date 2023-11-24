import { Option } from "fp-ts/lib/Option";
import User from "./user";

export default interface Message {
    id: Option<number>,
    sender: User,
    body: string,
    timestamp: Date,
}