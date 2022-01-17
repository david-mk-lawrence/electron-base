import { ipcMain, ipcRenderer, BrowserWindow } from "electron"
import {
    Channel,
    allowedChannels,
    IpcHandler,
    IpcInvoke,
    IpcInvokeResponse,
    IpcListener,
    IpcReceive,
    IpcSend,
    serialize,
} from "@/common"

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
                } catch (error) {
                    return { result: serialize(error), error: true }
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

// Exposed to renderer via context bridge
export const rendererSend: IpcSend = (channel: Channel, ...args: any[]): void => {
    if (allowedChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args)
    }
}

export const rendererReceive: IpcReceive = (
    channel: Channel,
    listener: (...args: any[]) => void,
): void => {
    if (allowedChannels.includes(channel)) {
        // event is stripped off for renderer
        ipcRenderer.on(channel, (_, ...args) => listener(...args))
    }
}

export const rendererInvoke: IpcInvoke = async (
    channel: Channel,
    ...args: any[]
): Promise<IpcInvokeResponse> => {
    if (allowedChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args)
    }

    return Promise.resolve({
        error: true,
        result: serialize(new Error("Invalid Channel")),
    })
}
