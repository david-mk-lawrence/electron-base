import { IpcListener, LogLevel } from "@/common"

import { getLogger } from "./logger"

export const handleRendererLog: IpcListener = async (
    _,
    level: LogLevel,
    entry: string,
) => {
    const logger = await getLogger()
    logger.log(level, entry)
}
