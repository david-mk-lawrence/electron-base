import { IpcMainInvokeEvent } from "electron"

import { JsonValue, Session, IpcHandler } from "@/common"
import { getSession, setSession } from "./session"

export const handleGetSession: IpcHandler = async (
    event: IpcMainInvokeEvent,
    ..._
): Promise<Session> => getSession(event.sender.id)

export const handleSetSession: IpcHandler = async (
    event: IpcMainInvokeEvent,
    sessionKey: string,
    value: JsonValue,
): Promise<Session> => setSession(event.sender.id, sessionKey, value)
