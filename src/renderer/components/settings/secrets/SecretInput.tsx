import React, { useState } from "react"

import { Secret } from "@/common"

interface LocalState {
    value: string
}

interface SecretEditorProps {
    secret?: Secret
    onReveal: () => void
    onHide: () => void
    onSave: (val: string) => void
}

export default function SecretInput(props: SecretEditorProps): JSX.Element {
    const [localState, setLocalState] = useState<LocalState>({
        value: props.secret?.val || "",
    })

    const onSecretReveal = (_: React.MouseEvent<HTMLButtonElement>): void => {
        props.onReveal()
    }

    const onSecretHide = (_: React.MouseEvent<HTMLButtonElement>): void => {
        props.onHide()
    }

    const onSecretSave = (_: React.MouseEvent<HTMLButtonElement>): void => {
        props.onSave(localState.value)
    }

    const onSecretUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalState({ value: event.currentTarget.value })
    }

    return (
        <>
            {props.secret !== undefined && (
                <>
                    <input
                        type="text"
                        onChange={onSecretUpdate}
                        defaultValue={props.secret.val}
                    />
                    <button onClick={onSecretSave}>Save Secret</button>
                    <button onClick={onSecretHide}>Hide Secret</button>
                </>
            )}
            {props.secret === undefined && (
                <button onClick={onSecretReveal}>Reveal Secret</button>
            )}
        </>
    )
}
