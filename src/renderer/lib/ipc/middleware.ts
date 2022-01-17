import { Action } from "redux"
import { ThunkMiddleware } from "redux-thunk"

import { deserialize } from "@/common"

const IPC_SEND = "@@IPC_SEND"
const IPC_INVOKE = "@@IPC_INVOKE"

export interface IpcAction extends Action<string> {
    payload: any
    channel: string
}

export interface IpcListener<T extends Action = Action> {
    (...args: any[]): T
}

export interface IpcErrorHandler<T extends Action = Action> {
    (error: Error): T
}

export type IpcListeners<T extends Action = Action> = Map<
    string,
    [IpcListener<T>, IpcErrorHandler<T>]
>

export const createIpcReceiveThunkMiddleware =
    <S, T extends Action = Action>(
        listeners: Map<string, IpcListener<T>>,
    ): ThunkMiddleware<S, T> =>
    ({ dispatch }) => {
        listeners.forEach((listener, channel) => {
            window.api.receive(channel, (...args) => {
                dispatch(listener(...args))
            })
        })

        return next => action => next(action)
    }

export const createIpcInvokeThunkMiddleware =
    <S, T extends Action = Action>(listeners: IpcListeners<T>): ThunkMiddleware<S, T> =>
    ({ dispatch }) =>
    next =>
    async (action: IpcAction) => {
        if (action.type.startsWith(IPC_INVOKE)) {
            const result = next(action)

            const ipcFuncs = listeners.get(action.channel)
            if (ipcFuncs) {
                const [listener, errorHandler] = ipcFuncs

                try {
                    const { result, error } = await window.api.invoke(
                        action.channel,
                        ...(action.payload || []),
                    )
                    if (error) {
                        throw deserialize(result)
                    }

                    dispatch(listener(result))
                } catch (error) {
                    dispatch(errorHandler(error))
                }
            }

            return result
        }

        return next(action)
    }

export const createIpcSendAction = <T>(channel: string, payload?: T): IpcAction => ({
    type: `${IPC_SEND}:${channel}`,
    channel,
    payload,
})

export const createIpcInvokeAction = <T>(channel: string, payload?: T): IpcAction => ({
    type: `${IPC_INVOKE}:${channel}`,
    channel,
    payload,
})
