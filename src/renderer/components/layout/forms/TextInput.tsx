import React from "react"

export default function TextInput(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
): JSX.Element {
    return (
        <>
            <input
                {...props}
                type="text"
                className="
                    w-full
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
            />
        </>
    )
}
