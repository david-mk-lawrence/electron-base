import {
    Settings,
    JsonValue,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
} from "@/common"
import { createIpcInvokeAction, IpcAction } from "@/renderer/lib/ipc"
import { IpcListener, IpcErrorHandler } from "@/renderer/store"
import {
    ReceiveSettingsAction,
    SettingsErrorAction,
    ClearSettingsErrorAction,
    RECEIVE_SETTINGS,
    SETTINGS_ERROR,
    CLEAR_SETTINGS_ERROR,
} from "./types"

export const receiveSettings: IpcListener<ReceiveSettingsAction> =
    (settings: Settings) => dispatch =>
        dispatch({ type: RECEIVE_SETTINGS, payload: settings })

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

export const handleSettingsError: IpcErrorHandler<SettingsErrorAction> =
    (error: Error) => dispatch =>
        dispatch(createSettingsError(error))
