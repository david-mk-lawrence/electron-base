import { debounce, DebouncedFunc } from "lodash"
import { useMemo } from "react"

export function useDebounce<T extends unknown[], S>(
    callback: (...args: T) => S,
    delay: number,
): DebouncedFunc<(...args: T) => S> {
    return useMemo(
        () => debounce((...args: T) => callback(...args), delay),
        [callback, delay],
    )
}
