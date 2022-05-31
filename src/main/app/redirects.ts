import { Event } from "electron"

export const handleOpenUrl = async (_: Event, openUrl: string): Promise<void> => {
    if (openUrl.startsWith("redirectUrl")) {
        // handle redirect
    }
}
