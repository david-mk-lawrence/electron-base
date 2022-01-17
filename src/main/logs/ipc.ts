import { IpcHandler } from "@/main/ipc"

export const handleRendererLog: IpcHandler = async (_, message: string) => {
    console.log(`Log from renderer: ${message}`)
}
