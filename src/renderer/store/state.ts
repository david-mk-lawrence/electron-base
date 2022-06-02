import { Action } from "redux"
import { ThunkAction as ReduxThunkAction } from "redux-thunk"

import { AlertState } from "./alerts"
import { KeyboardState } from "./keyboard"
import { SettingsState } from "./settings"
import { SessionState } from "./session"
import { SecretsState } from "./secrets"

export interface RootState {
    alert: AlertState
    keyboard: KeyboardState
    session: SessionState
    setting: SettingsState
    secrets: SecretsState
}

export interface Selector<T> {
    (state: RootState): T
}

export type ThunkAction<R> = ReduxThunkAction<R, RootState, never, Action>

export const NOOP = "NOOP"
export type Noop = Action<typeof NOOP>
