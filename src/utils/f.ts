import { Option } from "effect"
import { IdType } from "../types/message"



export const isTempId = (id: IdType) => id.isTempId

export const makeTempId = (id: string): IdType => ({ id, isTempId: true })

export const makeId = (id: string): IdType => ({ id, isTempId: false })

export const hash = (str: string): string => {
    let h = 0, i, chr;
    if (str.length === 0) return String(h);
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        h = ((h << 5) - h) + chr;
        h |= 0; // Convert to 32bit integer
    }
    return String(h);
}

export const doIfSome = <T>(fn: (t: T) => void) => (option: Option.Option<T>) => Option.match(option, {
    onNone: () => { },
    onSome: (t) => fn(t)
})
