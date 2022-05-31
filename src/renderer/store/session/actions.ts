import { Session, JsonValue, GET_SESSION_CHANNEL, SET_SESSION_CHANNEL } from "@/common"
import { createIpcInvokeAction, IpcAction } from "@/renderer/lib/ipc"
import { IpcListener, IpcErrorHandler } from "@/renderer/store"
import {
    ReceiveSessionAction,
    SessionErrorAction,
    ClearSessionErrorAction,
    RECEIVE_SESSION,
    SESSION_ERROR,
    CLEAR_SESSION_ERROR,
} from "./types"

export const receiveSession: IpcListener<ReceiveSessionAction> =
    (session: Session) => dispatch =>
        dispatch({ type: RECEIVE_SESSION, payload: session })

export const getSession = (): IpcAction => createIpcInvokeAction(GET_SESSION_CHANNEL)

export const setSession = (sessionKey: string, newValue: JsonValue): IpcAction =>
    createIpcInvokeAction(SET_SESSION_CHANNEL, [sessionKey, newValue])

export const createSessionError = (error: Error): SessionErrorAction => ({
    type: SESSION_ERROR,
    payload: error,
})

export const clearSessionError = (): ClearSessionErrorAction => ({
    type: CLEAR_SESSION_ERROR,
})

export const handleSessionError: IpcErrorHandler<SessionErrorAction> =
    (error: Error) => dispatch =>
        dispatch(createSessionError(error))
