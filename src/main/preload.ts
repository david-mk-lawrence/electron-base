import { contextBridge } from "electron"
import { rendererInvoke, rendererReceive, rendererSend } from "@/main/ipc"

contextBridge.exposeInMainWorld("api", {
    send: rendererSend,
    receive: rendererReceive,
    invoke: rendererInvoke,
})
