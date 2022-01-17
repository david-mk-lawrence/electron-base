import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { KeyboardAction } from "@/common"
import { selectKeyboardActions } from "@/renderer/store/keyboard"

interface LocalState {
    actions: KeyboardAction[]
}

export function useKeyboardActions(context: string): KeyboardAction[] {
    const [localState, setLocalState] = useState<LocalState>({ actions: [] })

    const keyboardActions = useSelector(selectKeyboardActions)

    useEffect(() => {
        if (keyboardActions && keyboardActions[context]) {
            setLocalState({
                actions: keyboardActions[context],
            })
        }
    }, [keyboardActions, context])

    return localState.actions
}
