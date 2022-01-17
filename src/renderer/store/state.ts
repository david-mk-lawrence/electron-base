import { AlertState } from "./alerts"
import { KeyboardState } from "./keyboard"
import { SettingsState } from "./settings"
import { SessionState } from "./session"

export interface RootState {
    alert: AlertState
    keyboard: KeyboardState
    session: SessionState
    setting: SettingsState
}

export interface Selector<T> {
    (state: RootState): T
}
