import React from "react"
import { Route, RouteProps, RouteComponentProps } from "react-router-dom"

import RouteContainer from "@/renderer/app/RouteContainer"

interface AppRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps>
    context: string
}

export default function AppRoute(props: AppRouteProps): JSX.Element {
    const { component, context, ...routeProps } = props

    return (
        <Route
            {...routeProps}
            render={(componentProps: RouteComponentProps): JSX.Element => (
                <RouteContainer context={context}>
                    {React.createElement(component, componentProps)}
                </RouteContainer>
            )}
        />
    )
}
