import React from "react"
import { HasChildren } from "@/renderer/components/types"

function Select(
    props: HasChildren &
        React.DetailedHTMLProps<
            React.SelectHTMLAttributes<HTMLSelectElement>,
            HTMLSelectElement
        >,
    ref: React.ForwardedRef<HTMLSelectElement>,
): JSX.Element {
    return (
        <select
            {...props}
            ref={ref}
            className="
            bg-white
            dark:bg-darkBase-second
            border
            dark:border-darkBase
            text-gray-900
            dark:text-gray-100
            sm:text-sm
            rounded-md
            shadow-sm
            focus:outline-none
            dark:focus:ring-darkTheme-second
            dark:focus:border-darkTheme-second"
        >
            {props.children}
        </select>
    )
}

export default React.forwardRef(Select)
