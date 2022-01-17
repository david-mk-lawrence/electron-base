import { IpcMainEvent, IpcMainInvokeEvent } from "electron"

import { SerializedError } from "@/common"

export interface IpcSend {
    (channel: string, ...args: any[]): void
}

export interface IpcReceive {
    (channel: string, listener: (...args: any[]) => void): void
}

export interface IpcInvokeResponse {
    result: any | SerializedError
    error: boolean
}

export interface IpcInvoke {
    (channel: string, ...args: any[]): Promise<IpcInvokeResponse>
}

export interface IpcListener {
    (event: IpcMainEvent, ...args: any[]): void
}

export interface IpcHandler {
    (event: IpcMainInvokeEvent, ...args: any[]): Promise<void> | any
}
