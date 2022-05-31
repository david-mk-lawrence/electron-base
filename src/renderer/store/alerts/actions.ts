import {
    Alert,
    AlertType,
    CreateAlertAction,
    ClearAlertsAction,
    CLEAR_ALERTS,
    CREATE_ALERT,
} from "./types"
import { IpcListener, ThunkAction } from "@/renderer/store"

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
    (keys: string[]): ThunkAction<ClearAlertsAction> =>
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
    (tags: string[]): ThunkAction<ClearAlertsAction> =>
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

export const receiveAlert: IpcListener<CreateAlertAction> =
    (key: string, type: AlertType, message: string) => dispatch =>
        dispatch({
            type: CREATE_ALERT,
            payload: {
                key,
                type,
                message,
                tags: [],
            },
        })
