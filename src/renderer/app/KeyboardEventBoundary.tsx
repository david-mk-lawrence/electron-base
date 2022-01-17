import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { broadcastKeyDown, selectKeyboardActions } from "@/renderer/store/keyboard"

interface KeyboardEventsProps {
    context: string
}

export default function KeyboardEventBoundary(props: KeyboardEventsProps): JSX.Element {
    const dispatch = useDispatch()
    const keyboardActions = useSelector(selectKeyboardActions)

    useEffect(() => {
        if (keyboardActions) {
            const contextActions = keyboardActions[props.context]
            if (!contextActions) {
                return
            }

            const modifierKeys = ["Meta", "Shift", "Control", "Alt"]

            const onKeyDown = (event: KeyboardEvent) => {
                for (const [, action] of Object.entries(contextActions)) {
                    const pressedKeys = new Set()
                    if (!modifierKeys.includes(event.key)) {
                        pressedKeys.add(event.key)
                    }

                    if (event.metaKey) {
                        pressedKeys.add("Meta")
                    }

                    if (event.shiftKey) {
                        pressedKeys.add("Shift")
                    }

                    if (event.ctrlKey) {
                        pressedKeys.add("Control")
                    }

                    if (event.altKey) {
                        pressedKeys.add("Alt")
                    }

                    if (action.combo.filter(k => !pressedKeys.has(k)).length === 0) {
                        dispatch(broadcastKeyDown(action))
                    }
                }
            }

            window.addEventListener("keydown", onKeyDown)

            return () => {
                window.removeEventListener("keydown", onKeyDown)
            }
        }

        return
    }, [keyboardActions, dispatch, props.context])

    return <></>
}
