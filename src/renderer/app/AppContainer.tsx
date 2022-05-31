import React, { Suspense, lazy, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HashRouter, Route, Routes } from "react-router-dom"

import { ROUTES, routeToPath } from "@/common"

import Alerts from "@/renderer/components/alerts/Alerts"
import Navbar from "@/renderer/components/layout/Navbar"
import Error from "@/renderer/components/layout/Error"
import Loading from "@/renderer/components/layout/Loading"
const Dashboard = lazy(() => import("@/renderer/components/dashboard/Dashboard"))
const NotFound = lazy(() => import("@/renderer/components/layout/NotFound"))
const Settings = lazy(() => import("@/renderer/components/settings/Settings"))
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

import KeyboardEventBoundary from "./KeyboardEventBoundary"
import RedirectEvents from "./RedirectEvents"
import RouteContainer from "./RouteContainer"

export default function AppContainer(): JSX.Element {
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

    if (settingsError) {
        return (
            <Error>
                <h1>Unable to load settings</h1>
            </Error>
        )
    }

    if (sessionError) {
        return (
            <Error>
                <h1>Unable to load session</h1>
            </Error>
        )
    }

    if (!settings || !session) {
        return <Loading />
    }

    return (
        <HashRouter>
            <KeyboardEventBoundary context="global" />
            <Navbar />
            <div className="container pt-14">
                <Suspense fallback={<Loading />}>
                    <RedirectEvents />
                    <Alerts />
                    <Routes>
                        <Route
                            path={routeToPath(ROUTES.home)}
                            element={
                                <RouteContainer context="home">
                                    <Dashboard />
                                </RouteContainer>
                            }
                        />
                        <Route
                            path={routeToPath(ROUTES.settings)}
                            element={
                                <RouteContainer context="settings">
                                    <Settings settings={settings} session={session} />
                                </RouteContainer>
                            }
                        />
                        <Route element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </HashRouter>
    )
}
