import { fold, Option } from "fp-ts/lib/Option"

export const doIfSome = <T>(fn: (value: T) => void): ((maybe: Option<T>) => void) => {
    return (maybe: Option<T>) => {
        fold(
            () => { },
            fn
        )(maybe)
    }
}