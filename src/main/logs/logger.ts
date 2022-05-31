import electronLog from "electron-log"

import { getSettings } from "@/main/settings"

import {
    LogLevel,
    LogEntry,
    DEFAULT_LEVEL,
    levelMapping,
    LEVEL_DEBUG,
    LEVEL_ERROR,
    LEVEL_INFO,
    LEVEL_WARN,
} from "@/common"

export class Logger {
    level: number

    enabled: boolean

    trace: boolean

    constructor(conf: { level: LogLevel; enabled: boolean; trace: boolean }) {
        this.level = levelMapping.get(conf.level) || DEFAULT_LEVEL
        this.enabled = conf.enabled
        this.trace = conf.trace
    }

    log(level: LogLevel, entry: LogEntry) {
        switch (level) {
            case "debug":
                this.debug(entry)
                break
            case "info":
                this.info(entry)
                break
            case "warn":
                this.warn(entry)
                break
            case "error":
                this.error(entry)
                break
        }
    }

    debug(entry: LogEntry) {
        if (this.shouldLog(LEVEL_DEBUG)) {
            electronLog.debug(this.entryToMessage(entry))
        }
    }

    info(entry: LogEntry) {
        if (this.shouldLog(LEVEL_INFO)) {
            electronLog.info(this.entryToMessage(entry))
        }
    }

    warn(entry: LogEntry) {
        if (this.shouldLog(LEVEL_WARN)) {
            electronLog.warn(this.entryToMessage(entry))
        }
    }

    error(entry: LogEntry) {
        if (this.shouldLog(LEVEL_ERROR)) {
            electronLog.error(this.entryToMessage(entry))
        }
    }

    private entryToMessage(entry: LogEntry): string {
        if (entry instanceof Error) {
            return this.errorToMessage(entry)
        }

        return entry
    }

    private errorToMessage(err: Error): string {
        let msg = err.name + " " + err.message
        if (this.trace) {
            msg += err.stack
        }

        return msg
    }

    private shouldLog(level: number): boolean {
        return this.enabled && level >= this.level
    }
}

export const getLogger = async (): Promise<Logger> => {
    const settings = await getSettings()
    return new Logger({
        level: settings.advanced.logging.level,
        enabled: settings.advanced.logging.enabled,
        trace: false,
    })
}
