import { KeyboardAction } from "@/common"

import {
    KEYBOARD_DOWN,
    KEYBOARD_ACTION_COMPLETE,
    KeyboardDownAction,
    KeyboardActionComplete,
} from "./types"

export const broadcastKeyDown = (action: KeyboardAction): KeyboardDownAction => ({
    type: KEYBOARD_DOWN,
    payload: action,
})

export const keyboardActionComplete = (): KeyboardActionComplete => ({
    type: KEYBOARD_ACTION_COMPLETE,
})
