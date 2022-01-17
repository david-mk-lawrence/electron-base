import {
    Channel,
    ERRORS_CHANNEL,
    LOGS_CHANNEL,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
    GET_SESSION_CHANNEL,
    SET_SESSION_CHANNEL,
    IpcHandler,
    IpcListener,
} from "@/common"
import { handleRendererError } from "@/main/errors"
import { handleRendererLog } from "@/main/logs"
import { handleGetSettings, handleSetSetting } from "@/main/settings"
import { handleGetSession, handleSetSession } from "@/main/session"

export const ipcListeners: Map<Channel, IpcListener> = new Map([])

export const ipcHandlers: Map<Channel, IpcHandler> = new Map([
    [ERRORS_CHANNEL, handleRendererError],
    [LOGS_CHANNEL, handleRendererLog],
    [GET_SETTINGS_CHANNEL, handleGetSettings],
    [SET_SETTINGS_CHANNEL, handleSetSetting],
    [GET_SESSION_CHANNEL, handleGetSession],
    [SET_SESSION_CHANNEL, handleSetSession],
])
