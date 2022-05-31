import { useEffect, useState } from "react"

import { comboToStrings, KeyboardAction } from "@/common"

interface LocalState {
    combo: string[]
}

export const useKeyboardCombo = (
    actions: KeyboardAction[],
    comboGetter: () => string[],
): string[] => {
    const [localState, setLocalState] = useState<LocalState>({ combo: [] })

    useEffect(() => {
        if (actions) {
            setLocalState({
                combo: comboToStrings(comboGetter()),
            })
        }
    }, [actions, comboGetter])

    return localState.combo
}
