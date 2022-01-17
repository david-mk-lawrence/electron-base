import { Action } from "redux"
import { Session } from "@/common"

export const RECEIVE_SESSION = "RECEIVE_SESSION"
export const SESSION_ERROR = "SESSION_ERROR"
export const CLEAR_SESSION_ERROR = "CLEAR_SESSION_ERROR"

export interface ReceiveSessionAction extends Action<typeof RECEIVE_SESSION> {
    payload: Session
}

export interface SessionErrorAction extends Action<typeof SESSION_ERROR> {
    payload: Error
}

export type ClearSessionErrorAction = Action<typeof CLEAR_SESSION_ERROR>

export type SessionActions =
    | ReceiveSessionAction
    | SessionErrorAction
    | ClearSessionErrorAction
