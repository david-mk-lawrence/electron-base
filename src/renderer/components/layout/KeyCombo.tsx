import React from "react"

import { comboToStrings } from "@/common"

interface KeyComboProps {
    combo: string[]
}

export default function KeyCombo(props: KeyComboProps): JSX.Element {
    return (
        <ul className="flex flex-row items-center text-center space-x-1.5">
            {comboToStrings(props.combo).map((key, idx) => (
                <li
                    key={idx}
                    className="bg-gray-300 text-gray-800 rounded shadow-md h-6 w-6"
                >
                    {key}
                </li>
            ))}
        </ul>
    )
}
