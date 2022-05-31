import { app } from "electron"
import { promises as fs } from "graceful-fs"
import path from "path"
import writeFileAtomic from "write-file-atomic"

import {
    AppError,
    JsonValue,
    Settings,
    Theme,
    UserSettings,
    ELEMENTS,
    SETTINGS_SCHEMAS,
    KEYBOARD_FOCUS,
    KEYBOARD_REDIRECT,
    ROUTES,
} from "@/common"
import { schemaValidate, ValidationErrors } from "@/main/validation"

const defaultSettings: Settings = {
    appearance: {
        theme: Theme.SYSTEM,
    },
    advanced: {
        logging: {
            enabled: true,
            level: "error",
        },
    },
    keyboard: {
        actions: {
            global: [
                {
                    combo: ["Meta", "p"],
                    action: KEYBOARD_FOCUS,
                    extra: {
                        element: ELEMENTS.global.profile,
                    },
                },
                {
                    combo: ["Meta", "g"],
                    action: KEYBOARD_FOCUS,
                    extra: {
                        element: ELEMENTS.global.region,
                    },
                },
                {
                    combo: ["Meta", "ArrowLeft"],
                    action: KEYBOARD_REDIRECT,
                    extra: {
                        to: {
                            name: "back",
                            path: ["@back"],
                        },
                    },
                },
                {
                    combo: ["Meta", "ArrowRight"],
                    action: KEYBOARD_REDIRECT,
                    extra: {
                        to: {
                            name: "forward",
                            path: ["@forward"],
                        },
                    },
                },
                {
                    combo: ["Meta", ","],
                    action: KEYBOARD_REDIRECT,
                    extra: {
                        to: ROUTES.settings,
                    },
                },
                {
                    combo: ["Meta", "/"],
                    action: KEYBOARD_REDIRECT,
                    extra: {
                        to: ROUTES.home,
                    },
                },
                {
                    combo: ["Meta", "s"],
                    action: KEYBOARD_REDIRECT,
                    extra: {
                        to: ROUTES.s3,
                    },
                },
            ],
        },
    },
}

const settingsConfig = {
    fileName: "settings.json",
}

const getSettingsPath = (): string =>
    path.join(app.getPath("userData"), settingsConfig.fileName)

const getUserSettings = async (): Promise<UserSettings> => {
    let settingsJson: string

    try {
        settingsJson = await fs.readFile(getSettingsPath(), { encoding: "utf-8" })
    } catch (error) {
        // Assume the file didn't exist and return empty
        return {}
    }

    try {
        return JSON.parse(settingsJson) as UserSettings
    } catch (error) {
        throw new AppError(`Unable to parse ${getSettingsPath()} as valid JSON.`)
    }
}

const writeSettings = async (settings: UserSettings): Promise<void> => {
    try {
        await writeFileAtomic(getSettingsPath(), JSON.stringify(settings, null, 4), {
            encoding: "utf-8",
        })
    } catch (error: unknown) {
        const err = error as Error
        throw new AppError(
            `Failed to write ${getSettingsPath()}  to disk. ${err.toString()}`,
        )
    }
}

export const getSettings = async (): Promise<Settings> => {
    const { default: lodash } = await import("lodash")

    const userSettings = await getUserSettings()
    return lodash.merge(defaultSettings, userSettings) as Settings
}

export const setSetting = async (setting: string, value: JsonValue): Promise<void> => {
    const schema = SETTINGS_SCHEMAS.get(setting)
    if (!schema) {
        throw new AppError(`${setting} is not a valid setting`)
    }

    const errors = await schemaValidate(schema, value)
    if (!(errors === null || errors === undefined)) {
        throw new ValidationErrors(`Unable to validate setting ${setting}`, errors)
    }

    const { default: lodash } = await import("lodash")
    const settings = await getUserSettings()
    const newSettings = lodash.set(settings, setting, value)

    return writeSettings(newSettings)
}
