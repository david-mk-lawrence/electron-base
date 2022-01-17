export type Channel = string

export const ERRORS_CHANNEL = "errors"
export const LOGS_CHANNEL = "logs"
export const ALERTS_CHANNEL = "alerts"

// Settings
export const GET_SETTINGS_CHANNEL = "settings:get"
export const SET_SETTINGS_CHANNEL = "settings:set"

// Session
export const GET_SESSION_CHANNEL = "session:get"
export const SET_SESSION_CHANNEL = "session:set"

export const allowedChannels: string[] = [
    ERRORS_CHANNEL,
    LOGS_CHANNEL,
    ALERTS_CHANNEL,
    GET_SESSION_CHANNEL,
    SET_SESSION_CHANNEL,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
]
