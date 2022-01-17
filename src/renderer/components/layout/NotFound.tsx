import React from "react"
import { Link, useLocation } from "react-router-dom"

export const TEST_ID_NOT_FOUND_CONTAINER = "notFound__container"
export const TEST_ID_NOT_FOUND_LINK = "notFound__link"

export default function NotFound(): JSX.Element {
    const loc = useLocation()
    return (
        <div className="container" data-testid={TEST_ID_NOT_FOUND_CONTAINER}>
            <div className="row">
                <div className="col s12">
                    <h1>Not Found</h1>
                    <p>
                        <Link to="/" data-testid={TEST_ID_NOT_FOUND_LINK}>
                            Back to home
                        </Link>
                    </p>
                    <p>
                        Attempted URL: Pathname: {loc.pathname}
                        <br />
                        Hash: {loc.hash}
                        <br />
                        Search: {loc.search}
                        <br />
                        Key: {loc.key}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    )
}
