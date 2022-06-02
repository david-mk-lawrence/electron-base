import React from "react"

import { HasChildren } from "@/renderer/components/types"

export default function Error(props: HasChildren): JSX.Element {
    return <div>{props.children}</div>
}
