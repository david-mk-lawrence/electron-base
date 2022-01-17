import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { isRedirectAction, routeToPath } from "@/common"
import {
    keyboardActionComplete,
    selectPendingKeyboardAction,
} from "@/renderer/store/keyboard"

export default function RedirectEvents(): JSX.Element {
    const dispatch = useDispatch()
    const keyboardAction = useSelector(selectPendingKeyboardAction)
    const history = useHistory()

    useEffect(() => {
        if (keyboardAction && isRedirectAction(keyboardAction)) {
            dispatch(keyboardActionComplete())

            let path: string | undefined = routeToPath(keyboardAction.extra.to)
            let go: -1 | 0 | 1 = 0
            if (path.startsWith("/@")) {
                const direction = path.slice(2)
                path = undefined
                if (direction === "back") {
                    go = -1
                } else if (direction === "forward") {
                    go = 1
                }

                history.go(go)
            } else {
                history.push(path)
            }
        }
    }, [keyboardAction, dispatch, history])

    return <></>
}
