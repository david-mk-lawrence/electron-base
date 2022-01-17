import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { JsonValue } from "@/common"
import {
    setSetting,
    selectSettings,
    selectSettingsError,
} from "@/renderer/store/settings"
import Appearance from "./settings/Appearance"

export default function Settings(): JSX.Element {
    // Redux state
    const settings = useSelector(selectSettings)
    const settingsError = useSelector(selectSettingsError)
    const dispatch = useDispatch()

    if (!settings) {
        return (
            <div>
                <h1>Loading Settings...</h1>
            </div>
        )
    }

    if (settingsError) {
        return (
            <div>
                <h1>Unable to load settings</h1>
            </div>
        )
    }

    const onSettingChange = (setting: string, newValue: JsonValue): void => {
        dispatch(setSetting(setting, newValue))
    }

    return (
        <div>
            <h1>Settings</h1>

            <Appearance onSettingChange={onSettingChange} settings={settings} />
        </div>
    )
}
