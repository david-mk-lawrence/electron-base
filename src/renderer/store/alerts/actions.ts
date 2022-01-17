import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import {
    Alert,
    AlertType,
    CreateAlertAction,
    ClearAlertsAction,
    CLEAR_ALERTS,
    CREATE_ALERT,
} from "./types"
import { IpcListener } from "@/renderer/lib/ipc"
import { RootState } from "@/renderer/store/state"

type AlertThunkAction<R> = ThunkAction<R, RootState, never, Action>

export const createAlert = (alert: Alert): CreateAlertAction => ({
    type: CREATE_ALERT,
    payload: alert,
})

export const clearAlert = (alert: Alert): ClearAlertsAction => {
    if (alert.onClear) {
        alert.onClear()
    }

    return { type: CLEAR_ALERTS, payload: [alert.key] }
}

export const clearAlertsByKeys =
    (keys: string[]): AlertThunkAction<ClearAlertsAction> =>
    (dispatch, getState) => {
        for (const key of keys) {
            const alert = getState().alert.alerts[key]
            if (alert && alert.onClear) {
                alert.onClear()
            }
        }

        return dispatch({ type: CLEAR_ALERTS, payload: keys })
    }

export const clearAlertByTags =
    (tags: string[]): AlertThunkAction<ClearAlertsAction> =>
    (dispatch, getState) => {
        const alerts = getState().alert.alerts
        const keys = []
        for (const tag of tags) {
            for (const [key, alert] of Object.entries(alerts)) {
                if (alert.onClear && alert.tags.includes(tag)) {
                    alert.onClear()
                    keys.push(key)
                }
            }
        }

        return dispatch({ type: CLEAR_ALERTS, payload: keys })
    }

export const receiveAlert: IpcListener = (
    key: string,
    type: AlertType,
    message: string,
): CreateAlertAction => ({
    type: CREATE_ALERT,
    payload: {
        key,
        type,
        message,
        tags: [],
    },
})
