import { Secret, GET_SECRET_CHANNEL, SET_SECRET_CHANNEL } from "@/common"
import { createIpcInvokeAction, IpcAction } from "@/renderer/lib/ipc"
import { createAlert, CreateAlertAction } from "@/renderer/store/alerts"
import { IpcListener, IpcErrorHandler } from "@/renderer/store"
import {
    ReceiveSecretAction,
    SecretErrorAction,
    ClearSecretErrorAction,
    HideSecretAction,
    RECEIVE_SECRET,
    SECRET_ERROR,
    CLEAR_SECRET_ERROR,
    HIDE_SECRET,
} from "./types"

export const receiveSecret: IpcListener<ReceiveSecretAction> =
    (secret: Secret) => dispatch =>
        dispatch({ type: RECEIVE_SECRET, payload: secret })

export const receiveSecretSet: IpcListener<HideSecretAction | CreateAlertAction> =
    (secret: Secret) => dispatch => {
        dispatch({ type: HIDE_SECRET, payload: secret.name })
        dispatch(
            createAlert({
                key: "secrets-saved",
                type: "success",
                tags: ["system", "secrets", "success"],
                message: "Successfully saved secret.",
            }),
        )
    }

export const getSecret = (name: string): IpcAction =>
    createIpcInvokeAction(GET_SECRET_CHANNEL, [name])

export const setSecret = (name: string, val: string): IpcAction =>
    createIpcInvokeAction(SET_SECRET_CHANNEL, [name, val])

export const hideSecret = (name: string): HideSecretAction => ({
    type: HIDE_SECRET,
    payload: name,
})

export const createSecretsError = (error: Error): SecretErrorAction => ({
    type: SECRET_ERROR,
    payload: error,
})

export const clearSecretsError = (): ClearSecretErrorAction => ({
    type: CLEAR_SECRET_ERROR,
})

export const handleSecretsError: IpcErrorHandler<SecretErrorAction> =
    (error: Error) => dispatch =>
        dispatch(createSecretsError(error))
