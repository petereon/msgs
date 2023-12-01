import { either } from "fp-ts"
import { Either, isRight } from "fp-ts/lib/Either"
import { Option, fold } from "fp-ts/lib/Option"

export const doIfSome = <T>(fn: (value: T) => void): ((maybe: Option<T>) => void) => {
    return (maybe: Option<T>) => {
        fold(
            () => { },
            fn
        )(maybe)
    }
}

export const isTempId = isRight<Either<string, string>>
export const makeTempId = (id: string): Either<string, string> => either.right(id)
export const makeId = (id: string): Either<string, string> => either.left(id)

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
