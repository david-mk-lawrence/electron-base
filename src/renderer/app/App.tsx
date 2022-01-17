import React, { lazy } from "react"
import { Provider } from "react-redux"
import { HashRouter, Route, Switch } from "react-router-dom"

import { ROUTES, routeToPath } from "@/common"
import createStore from "./createStore"
import ErrorBoundary from "./ErrorBoundary"
import AppContainer from "./AppContainer"
import AppRoute from "./AppRoute"

import "./App.css"

const store = createStore()

const Dashboard = lazy(() => import("@/renderer/components/dashboard/Dashboard"))
const NotFound = lazy(() => import("@/renderer/components/layout/NotFound"))
const Settings = lazy(() => import("@/renderer/components/settings/Settings"))

export function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <HashRouter>
                    <AppContainer>
                        <Switch>
                            <AppRoute
                                exact={true}
                                path={routeToPath(ROUTES.home)}
                                component={Dashboard}
                                context="home"
                            />
                            <AppRoute
                                exact={true}
                                path={routeToPath(ROUTES.settings)}
                                component={Settings}
                                context="settings"
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </AppContainer>
                </HashRouter>
            </Provider>
        </ErrorBoundary>
    )
}
