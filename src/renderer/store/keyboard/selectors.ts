import { KeyboardAction, KeyboardContextActions } from "@/common"
import { Selector } from "@/renderer/store/state"

export const selectPendingKeyboardAction: Selector<KeyboardAction | undefined> =
    state => state.keyboard.action

export const selectKeyboardActions: Selector<KeyboardContextActions | undefined> =
    state => state.setting.settings?.keyboard.actions
