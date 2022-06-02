import { ipcMain, BrowserWindow } from "electron"
import {
    Channel,
    allowedChannels,
    IpcHandler,
    IpcInvokeResponse,
    IpcListener,
    serialize,
} from "@/common"
import { getLogger } from "@/main/logs"

export const registerIpcListeners = (listeners: Map<Channel, IpcListener>): void => {
    listeners.forEach((listener, channel) => {
        if (allowedChannels.includes(channel)) {
            ipcMain.on(channel, listener)
        }
    })
}

export const registerIpcHandlers = (handlers: Map<Channel, IpcHandler>): void => {
    handlers.forEach((handler, channel) => {
        if (allowedChannels.includes(channel)) {
            ipcMain.handle(channel, async (...args): Promise<IpcInvokeResponse> => {
                try {
                    return {
                        result: await Promise.resolve(handler(...args)),
                        error: false,
                    }
                } catch (error: unknown) {
                    const err = error as Error
                    const logger = await getLogger()
                    logger.info(err)
                    return { result: serialize(err), error: true }
                }
            })
        }
    })
}

export const sendToRenderer = (channel: Channel, ...args: any[]): void => {
    const window = BrowserWindow.getFocusedWindow()
    if (window && allowedChannels.includes(channel)) {
        window.webContents.send(channel, ...args)
    }
}
