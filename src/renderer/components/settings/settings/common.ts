import { JsonValue } from "@/common/settings"

export interface OnSettingChange {
    (setting: string, newValue: JsonValue): void
}
