import { Action } from "redux"

import { KeyboardAction } from "@/common"

export const KEYBOARD_DOWN = "KEYBOARD_DOWN"
export const KEYBOARD_ACTION_COMPLETE = "KEYBOARD_ACTION_COMPLETE"

export interface KeyboardDownAction extends Action<typeof KEYBOARD_DOWN> {
    payload: KeyboardAction
}

export type KeyboardActionComplete = Action<typeof KEYBOARD_ACTION_COMPLETE>

export type KeyboardActions = KeyboardDownAction | KeyboardActionComplete
