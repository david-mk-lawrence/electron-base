import { IpcInvoke, IpcReceive, IpcSend } from "@/common/ipc"

export {}

declare global {
    interface Window {
        api: {
            invoke: IpcInvoke
            send: IpcSend
            receive: IpcReceive
        }
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}
