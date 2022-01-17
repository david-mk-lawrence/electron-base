import { ALERTS_CHANNEL } from "@/common"
import { sendToRenderer } from "@/main/ipc"

export const sendAlert = (key: string, type: string, message: string): void => {
    sendToRenderer(ALERTS_CHANNEL, key, type, message)
}
