import { KeyboardState } from "./state"
import { KEYBOARD_DOWN, KEYBOARD_ACTION_COMPLETE, KeyboardActions } from "./types"

const initState: KeyboardState = {
    action: undefined,
}

export const keyboardReducer = (
    state: KeyboardState = initState,
    action: KeyboardActions,
): KeyboardState => {
    switch (action.type) {
        case KEYBOARD_DOWN:
            return {
                ...state,
                action: action.payload,
            }
        case KEYBOARD_ACTION_COMPLETE:
            return {
                ...state,
                action: undefined,
            }
        default:
            return state
    }
}
