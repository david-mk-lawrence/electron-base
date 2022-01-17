import {
    ALERTS_CHANNEL,
    GET_SESSION_CHANNEL,
    SET_SESSION_CHANNEL,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
} from "@/common"

import { IpcListeners } from "@/renderer/lib/ipc"
import { receiveAlert } from "./alerts"
import { receiveSession, handleSessionError } from "./session"
import { receiveSettings, handleSettingsError } from "./settings"

export const ipcInvokeListeners: IpcListeners = new Map([
    [GET_SESSION_CHANNEL, [receiveSession, handleSessionError]],
    [SET_SESSION_CHANNEL, [receiveSession, handleSessionError]],
    [GET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
    [SET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
])
export const ipcReceiveListeners = new Map([[ALERTS_CHANNEL, receiveAlert]])
