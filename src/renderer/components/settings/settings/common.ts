import { JsonValue } from "@/common"

export interface OnSettingChange {
    (setting: string, newValue: JsonValue): void
}
