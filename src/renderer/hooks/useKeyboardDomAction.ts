import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { KeyboardAction } from "@/common"
import {
    keyboardActionComplete,
    selectPendingKeyboardAction,
} from "@/renderer/store/keyboard"

export const useKeyboardDomAction = <T>(
    shouldHandle: (action: KeyboardAction) => boolean,
    handle: (ref: React.RefObject<T>, action: KeyboardAction) => void,
): React.RefObject<T> => {
    const ref = useRef<T>(null)
    const dispatch = useDispatch()
    const action = useSelector(selectPendingKeyboardAction)

    useEffect(() => {
        if (ref && ref.current && action && shouldHandle(action)) {
            handle(ref, action)
            dispatch(keyboardActionComplete())
        }
    }, [ref, action, shouldHandle, handle, dispatch])

    return ref
}
