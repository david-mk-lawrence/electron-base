import React from "react"

import { Settings, logLevels } from "@/common"
import { OnSettingChange } from "./common"

import Radio from "@/renderer/components/layout/forms/Radio"
import Checkbox from "@/renderer/components/layout/forms/Checkbox"

export interface AdvancedProps {
    onSettingChange: OnSettingChange
    settings: Settings
}

export default function Advanced(props: AdvancedProps): JSX.Element {
    const onLoggingLevelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const nextVal = event.target.value
        props.onSettingChange("advanced.logging.level", nextVal)
    }

    const onLoggingEnabledChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const nextVal = !!event.target.value
        props.onSettingChange("advanced.logging.enabled", nextVal)
    }

    return (
        <div>
            <h2>Advanced</h2>
            <hr />
            <h3>Logging</h3>
            {logLevels.map((value, idx) => (
                <label key={idx} htmlFor="logLevel">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                    <Radio
                        name="logLevel"
                        value={value}
                        onChange={onLoggingLevelChange}
                        checked={value === props.settings.advanced.logging.level}
                    />
                </label>
            ))}
            <label htmlFor="loggingEnabled">
                Enabled
                <Checkbox
                    name="loggingEnabled"
                    onChange={onLoggingEnabledChange}
                    checked={props.settings.advanced.logging.enabled}
                />
            </label>
        </div>
    )
}
