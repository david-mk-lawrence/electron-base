import React from "react"
import { useDispatch } from "react-redux"

import { JsonValue } from "@/common"
import { setSetting } from "@/renderer/store/settings"
import { AppProps } from "@/renderer/components/types"
import Appearance from "./settings/Appearance"
import Advanced from "./settings/Advanced"

export type SettingsProps = AppProps

export default function Settings(props: SettingsProps): JSX.Element {
    // Redux state
    const dispatch = useDispatch()

    const onSettingChange = (setting: string, newValue: JsonValue): void => {
        dispatch(setSetting(setting, newValue))
    }

    return (
        <div>
            <h1>Settings</h1>

            <Appearance onSettingChange={onSettingChange} settings={props.settings} />
            <Advanced onSettingChange={onSettingChange} settings={props.settings} />

            {/* <h1>Secrets</h1> */}
        </div>
    )
}
