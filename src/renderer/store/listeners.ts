import { Action } from "redux"

import {
    ALERTS_CHANNEL,
    GET_SESSION_CHANNEL,
    SET_SESSION_CHANNEL,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
    GET_SECRET_CHANNEL,
    SET_SECRET_CHANNEL,
} from "@/common"

import {
    IpcListeners as LibIpcListeners,
    IpcListener as LibIpcListener,
    IpcErrorHandler as LibIpcErrorHandler,
} from "@/renderer/lib/ipc"
import { receiveAlert } from "./alerts"
import { receiveSession, handleSessionError } from "./session"
import { receiveSettings, handleSettingsError } from "./settings"
import { receiveSecret, receiveSecretSet, handleSecretsError } from "./secrets"
import { RootState } from "./state"

// import { Noop, NOOP } from "./state"
// const receiveVoid: IpcListener = (): Noop => ({ type: NOOP })

export type IpcListener<T extends Action = Action> = LibIpcListener<RootState, T>
export type IpcErrorHandler<T extends Action = Action> = LibIpcErrorHandler<
    RootState,
    T
>
export type IpcListeners<T extends Action = Action> = LibIpcListeners<RootState, T>

export const ipcInvokeListeners: IpcListeners = new Map([
    [GET_SESSION_CHANNEL, [receiveSession, handleSessionError]],
    [SET_SESSION_CHANNEL, [receiveSession, handleSessionError]],
    [GET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
    [SET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
    [GET_SECRET_CHANNEL, [receiveSecret, handleSecretsError]],
    [SET_SECRET_CHANNEL, [receiveSecretSet, handleSecretsError]],
])

export const ipcReceiveListeners = new Map([[ALERTS_CHANNEL, receiveAlert]])
