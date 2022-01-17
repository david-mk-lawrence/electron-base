import { IpcHandler } from "@/main/ipc"

export const handleRendererError: IpcHandler = async (
    _,
    error: Error,
    stackTrace: string,
) => {
    console.error(`Error from renderer: ${error}\n${stackTrace}`)
}
