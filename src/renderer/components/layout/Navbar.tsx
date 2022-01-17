import React from "react"
import { Link } from "react-router-dom"
import { CogIcon } from "@heroicons/react/solid"

import { ROUTES, routeToPath } from "@/common"

export default function Navbar(): JSX.Element {
    return (
        <div className="fixed window-drag w-full dark:bg-darkTheme dark:text-darkBase">
            <nav className="flex flex-wrap justify-between items-center py-2">
                <ul className="flex flex-1 justify-end items-center">
                    <li className="pr-6">
                        <Link to={routeToPath(ROUTES.settings)}>
                            <CogIcon className="h-7 w-7" />
                        </Link>
                    </li>
                    <li className="pr-6">
                        <Link to={routeToPath(ROUTES.home)}>Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
