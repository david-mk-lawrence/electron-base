import { combineReducers } from "redux"

import { alertReducer } from "./alerts"
import { keyboardReducer } from "./keyboard"
import { sessionReducer } from "./session"
import { settingsReducer } from "./settings"
import { RootState } from "./state"

export const rootReducer = combineReducers<RootState>({
    alert: alertReducer,
    keyboard: keyboardReducer,
    session: sessionReducer,
    setting: settingsReducer,
})
