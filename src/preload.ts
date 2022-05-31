import { contextBridge, ipcRenderer } from "electron"

import {
    Channel,
    allowedChannels,
    IpcInvokeResponse,
    serialize,
    IpcReceive,
    IpcSend,
    IpcInvoke,
} from "@/common"

const send: IpcSend = (channel: Channel, ...args: any[]): void => {
    if (allowedChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args)
    }
}

const receive: IpcReceive = (
    channel: Channel,
    listener: (...args: any[]) => void,
): void => {
    if (allowedChannels.includes(channel)) {
        // event is stripped off for renderer
        ipcRenderer.on(channel, (_, ...args) => listener(...args))
    }
}

const invoke: IpcInvoke = async (
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

contextBridge.exposeInMainWorld("api", {
    send,
    receive,
    invoke,
})
