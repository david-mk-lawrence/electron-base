import React, { lazy } from "react"
import { useSelector } from "react-redux"

import { Alert as AlertObj, selectAlerts } from "@/renderer/store/alerts"

const GenericAlert = lazy(() => import("@/renderer/components/alerts/Alert"))

export const TEST_ID_ALERTS_CONTAINER = "alerts__container"

export default function Alerts(): JSX.Element {
    // Redux state
    const alerts = useSelector(selectAlerts)

    if (Object.keys(alerts).length < 1) {
        return <></>
    }

    const getAlertElement = (alert: AlertObj, key: number): JSX.Element => {
        return <GenericAlert alert={alert} key={key} />
    }

    return (
        <div data-testid={TEST_ID_ALERTS_CONTAINER}>
            {Object.keys(alerts).map((key, idx) => getAlertElement(alerts[key], idx))}
        </div>
    )
}
