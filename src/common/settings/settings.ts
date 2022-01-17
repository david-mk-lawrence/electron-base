import { JsonObject } from "@/common/json"
import { KeyboardContextActions } from "@/common/keyboard"

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
    keyboard: {
        actions: KeyboardContextActions
    }
}

export const SETTINGS_KEYS = {
    THEME: "appearance.theme",
}

export const SETTINGS_SCHEMAS = new Map([
    [
        SETTINGS_KEYS.THEME,
        {
            type: "string",
            enum: ["system", "light", "dark"],
        },
    ],
])

// UserSettings may contain an arbitrary subset of settings
export type UserSettings = Settings | JsonObject
