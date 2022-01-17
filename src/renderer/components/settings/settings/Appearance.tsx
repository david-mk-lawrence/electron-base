import React from "react"

import { Settings, getThemes } from "@/common/settings"
import { OnSettingChange } from "./common"

import Radio from "@/renderer/components/layout/forms/Radio"

export interface AppearanceProps {
    onSettingChange: OnSettingChange
    settings: Settings
}

export default function Appearance(props: AppearanceProps): JSX.Element {
    const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const nextVal = event.target.value
        props.onSettingChange("appearance.theme", nextVal)
    }

    const themes = getThemes()

    return (
        <div>
            <h2>Appearance</h2>
            <hr />
            <h3>Theme</h3>
            {themes.map((value, idx) => (
                <label key={idx} htmlFor="theme">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                    <Radio
                        name="theme"
                        value={value}
                        onChange={onThemeChange}
                        checked={value === props.settings.appearance.theme}
                    />
                </label>
            ))}
        </div>
    )
}
