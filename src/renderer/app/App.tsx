import React from "react"
import { Provider } from "react-redux"

import createStore from "./createStore"
import ErrorBoundary from "./ErrorBoundary"
import AppContainer from "./AppContainer"

import "./App.css"

const store = createStore()

export function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </ErrorBoundary>
    )
}
