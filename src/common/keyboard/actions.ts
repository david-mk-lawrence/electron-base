import { JsonObject, JsonValue } from "@/common/json"
import { Element } from "@/common/elements"
import { Route } from "@/common/routes"

export const KEYBOARD_FOCUS = "FOCUS"
export const KEYBOARD_REDIRECT = "REDIRECT"

type KeyboardActionTypes = typeof KEYBOARD_FOCUS | typeof KEYBOARD_REDIRECT

export interface KeyboardAction<
    T extends KeyboardActionTypes = KeyboardActionTypes,
    E extends JsonValue = JsonValue,
> extends JsonObject {
    combo: string[]
    action: T
    extra: E
}

export interface FocusAction extends KeyboardAction<typeof KEYBOARD_FOCUS> {
    extra: {
        element: Element
    }
}

export interface RedirectAction extends KeyboardAction<typeof KEYBOARD_REDIRECT> {
    extra: {
        to: Route
    }
}

export interface KeyboardContextActions {
    [context: string]: KeyboardAction[]
}

export const MODIFIER_KEY_CHAR_CODES: { [key: string]: number } = {
    Meta: 0x2318,
    Shift: 0x21e7,
    Control: 0x2303,
    Alt: 0x2325,
}

export const isFocusAction = (action: KeyboardAction): action is FocusAction =>
    action.action === KEYBOARD_FOCUS

export const isRedirectAction = (action: KeyboardAction): action is RedirectAction =>
    action.action === KEYBOARD_REDIRECT

export const comboToStrings = (combo: string[]): string[] =>
    combo.map(key => {
        if (MODIFIER_KEY_CHAR_CODES[key]) {
            return String.fromCharCode(MODIFIER_KEY_CHAR_CODES[key])
        }

        return key
    })

export const getFocusComboByElementId = (
    actions: KeyboardAction[],
    elementId: string,
): string[] => {
    const action = actions.find(
        action => isFocusAction(action) && action.extra.element.id === elementId,
    ) as FocusAction | undefined
    if (action) {
        return action.combo
    }

    return []
}

export const getRedirectComboByRouteName = (
    actions: KeyboardAction[],
    name: string,
): string[] => {
    const action = actions.find(
        action => isRedirectAction(action) && action.extra.to.name === name,
    ) as RedirectAction | undefined
    if (action) {
        return action.combo
    }

    return []
}
