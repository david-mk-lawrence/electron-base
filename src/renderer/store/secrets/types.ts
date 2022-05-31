import { Action } from "redux"

import { Secret } from "@/common"

export const RECEIVE_SECRET = "RECEIVE_SECRET"
export const SECRET_ERROR = "SECRET_ERROR"
export const HIDE_SECRET = "HIDE_SECRET"
export const CLEAR_SECRET_ERROR = "CLEAR_SECRET_ERROR"

export interface ReceiveSecretAction extends Action<typeof RECEIVE_SECRET> {
    payload: Secret
}

export interface HideSecretAction extends Action<typeof HIDE_SECRET> {
    payload: string
}

export interface SecretErrorAction extends Action<typeof SECRET_ERROR> {
    payload: Error
}

export type ClearSecretErrorAction = Action<typeof CLEAR_SECRET_ERROR>

export type SecretActions =
    | ReceiveSecretAction
    | HideSecretAction
    | SecretErrorAction
    | ClearSecretErrorAction
