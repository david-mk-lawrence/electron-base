import { JsonObject } from "@/common/json"
import { KeyboardContextActions } from "@/common/keyboard"
import { LogLevel } from "@/common/logging"

export enum Theme {
    SYSTEM = "system",
    LIGHT = "light",
    DARK = "dark",
}

export const getThemes = (): string[] => {
    const themes: string[] = []
    for (const theme of Object.values(Theme)) {
        themes.push(theme)
    }

    return themes
}

export interface Settings extends JsonObject {
    appearance: {
        theme: Theme
    }
    advanced: {
        logging: {
            enabled: boolean
            level: LogLevel
        }
    }
    keyboard: {
        actions: KeyboardContextActions
    }
}

export const SETTINGS_KEYS = {
    THEME: "appearance.theme",
    LOG_LEVEL: "advanced.logging.level",
}

export const SETTINGS_SCHEMAS = new Map([
    [
        SETTINGS_KEYS.THEME,
        {
            type: "string",
            enum: ["system", "light", "dark"],
        },
    ],
    [
        SETTINGS_KEYS.LOG_LEVEL,
        {
            type: "string",
            enum: ["debug", "info", "warn", "error"],
        },
    ],
])

// UserSettings may contain an arbitrary subset of settings
export type UserSettings = Settings | JsonObject
