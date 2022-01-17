import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    getSession,
    clearSessionError,
    selectSession,
    selectSessionError,
} from "@/renderer/store/session"
import {
    getSettings,
    clearSettingsError,
    selectSettings,
    selectSettingsError,
} from "@/renderer/store/settings"
import { createAlert } from "@/renderer/store/alerts"

import Alerts from "@/renderer/components/alerts/Alerts"
import Navbar from "@/renderer/components/layout/Navbar"
import Loading from "@/renderer/components/layout/Loading"
import KeyboardEventBoundary from "./KeyboardEventBoundary"
import RedirectEvents from "./RedirectEvents"

interface AppContainerProps {
    children: React.ReactNode
}

export default function AppContainer(props: AppContainerProps): JSX.Element {
    // Redux state
    const dispatch = useDispatch()
    const settings = useSelector(selectSettings)
    const settingsError = useSelector(selectSettingsError)
    const session = useSelector(selectSession)
    const sessionError = useSelector(selectSessionError)

    // Get Settings
    useEffect(() => {
        if (!settings) {
            dispatch(getSettings())
        }
    }, [settings, dispatch])

    // Get Session
    useEffect(() => {
        if (!session) {
            dispatch(getSession())
        }
    }, [session, dispatch])

    // Handle Errors
    useEffect(() => {
        if (sessionError) {
            dispatch(
                createAlert({
                    key: "session-error",
                    type: "warning",
                    tags: ["system", "session", "warning"],
                    message: sessionError,
                    onClear: () => {
                        dispatch(clearSessionError())
                        dispatch(getSession())
                    },
                }),
            )
        }
    }, [sessionError, dispatch])

    useEffect(() => {
        if (settingsError) {
            dispatch(
                createAlert({
                    key: "settings-error",
                    type: "warning",
                    tags: ["system", "settings", "warning"],
                    message: settingsError,
                    onClear: () => {
                        dispatch(clearSettingsError())
                        dispatch(getSettings())
                    },
                }),
            )
        }
    }, [settingsError, dispatch])

    return (
        <>
            <KeyboardEventBoundary context="global" />
            <Navbar />
            <div className="container pt-14">
                <Suspense fallback={<Loading />}>
                    <RedirectEvents />
                    <Alerts />
                    {props.children}
                </Suspense>
            </div>
        </>
    )
}
