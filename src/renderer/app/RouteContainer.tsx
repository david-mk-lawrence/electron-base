import React, { useCallback } from "react"

import { getRedirectComboByRouteName } from "@/common"
import { HasChildren } from "@/renderer/components/types"
import { useKeyboardActions, useKeyboardCombo } from "@/renderer/hooks"

import KeyCombo from "@/renderer/components/layout/KeyCombo"
import KeyboardEventBoundary from "./KeyboardEventBoundary"

type RouteContainerProps = HasChildren & {
    context: string
}

export default function RouteContainer(props: RouteContainerProps): JSX.Element {
    const globalKeyboardActions = useKeyboardActions("global")
    const combo = useKeyboardCombo(
        globalKeyboardActions,
        useCallback(
            () => getRedirectComboByRouteName(globalKeyboardActions, props.context),
            [globalKeyboardActions, props.context],
        ),
    )

    return (
        <>
            <KeyboardEventBoundary context={props.context} />
            <div className="float-right">
                <KeyCombo combo={combo} />
            </div>
            <div className="clear-right">{props.children}</div>
        </>
    )
}
