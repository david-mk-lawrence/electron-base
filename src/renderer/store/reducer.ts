import { combineReducers } from "redux"

import { alertReducer } from "./alerts"
import { keyboardReducer } from "./keyboard"
import { sessionReducer } from "./session"
import { settingsReducer } from "./settings"
import { secretsReducer } from "./secrets"
import { RootState } from "./state"

export const rootReducer = combineReducers<RootState>({
    alert: alertReducer,
    keyboard: keyboardReducer,
    secrets: secretsReducer,
    session: sessionReducer,
    setting: settingsReducer,
})
