import { nativeTheme } from "electron"

import { Settings } from "@/common"
import { getSettings } from "@/main/settings"
import { setDefaultSession } from "@/main/session"

export const init = async (): Promise<Settings> => {
    const settings = await getSettings()

    // Appearance
    nativeTheme.themeSource = settings.appearance.theme

    // Sessions
    setDefaultSession({})

    return settings
}
