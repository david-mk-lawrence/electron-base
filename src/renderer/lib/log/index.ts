import { LOGS_CHANNEL } from "@/common/ipc/channels"

export const log = (message: string): void => {
    window.api.invoke(LOGS_CHANNEL, message)
}
