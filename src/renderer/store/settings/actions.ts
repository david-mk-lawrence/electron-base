import {
    Settings,
    JsonValue,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
} from "@/common"
import {
    createIpcInvokeAction,
    IpcListener,
    IpcAction,
    IpcErrorHandler,
} from "@/renderer/lib/ipc"
import {
    ReceiveSettingsAction,
    SettingsErrorAction,
    ClearSettingsErrorAction,
    RECEIVE_SETTINGS,
    SETTINGS_ERROR,
    CLEAR_SETTINGS_ERROR,
} from "./types"

export const receiveSettings: IpcListener = (
    settings: Settings,
): ReceiveSettingsAction => ({ type: RECEIVE_SETTINGS, payload: settings })

export const getSettings = (): IpcAction => createIpcInvokeAction(GET_SETTINGS_CHANNEL)

export const setSetting = (setting: string, newValue: JsonValue): IpcAction =>
    createIpcInvokeAction(SET_SETTINGS_CHANNEL, [setting, newValue])

export const createSettingsError = (error: Error): SettingsErrorAction => ({
    type: SETTINGS_ERROR,
    payload: error,
})

export const clearSettingsError = (): ClearSettingsErrorAction => ({
    type: CLEAR_SETTINGS_ERROR,
})

export const handleSettingsError: IpcErrorHandler = (
    error: Error,
): SettingsErrorAction => createSettingsError(error)
