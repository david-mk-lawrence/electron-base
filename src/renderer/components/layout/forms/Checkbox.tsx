import React from "react"

export default function Checkbox(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
): JSX.Element {
    return (
        <>
            <input
                {...props}
                type="checkbox"
                className="
                    h-4 w-4
                    border
                    dark:border-darkBase
                    text-gray-900
                    dark:text-darkTheme
                    focus:ring-indigo-500
                    dark:focus:ring-darkTheme-second
                    dark:focus:border-darkTheme-second"
            />
        </>
    )
}
