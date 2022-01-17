import { JsonValue, Settings } from "@/common"
import { init } from "@/main/app"
import { IpcHandler } from "@/main/ipc"
import { getSettings, setSetting } from "./settings"

export const handleGetSettings: IpcHandler = async (..._): Promise<Settings> =>
    getSettings()

export const handleSetSetting: IpcHandler = async (
    _,
    setting: string,
    value: JsonValue,
): Promise<Settings> => {
    await setSetting(setting, value)
    return init()
}
