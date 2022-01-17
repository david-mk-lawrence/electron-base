import React from "react"
import { useDispatch } from "react-redux"

import { clearAlert, Alert as AlertType } from "@/renderer/store/alerts"

export const TEST_ID_ALERT_CONTAINER = "alert__container"
export const TEST_ID_ALERT_BUTTON = "alert__button"

export default function Alert(props: { alert: AlertType }): JSX.Element {
    const dispatch = useDispatch()

    const alert = props.alert
    const errorMessage: string = props.alert.message.toString
        ? props.alert.message.toString()
        : props.alert.message.toString

    const onCloseClick = (): void => {
        dispatch(clearAlert(alert))
    }

    return (
        <div className={"alert " + alert.type} data-testid={TEST_ID_ALERT_CONTAINER}>
            {errorMessage}
            <button
                type="button"
                className="close"
                onClick={onCloseClick}
                data-testid={TEST_ID_ALERT_BUTTON}
            >
                ×
            </button>
        </div>
    )
}
