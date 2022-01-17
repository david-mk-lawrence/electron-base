import { AppError, JsonValue, Session, SESSION_SCHEMAS } from "@/common"
import { schemaValidate, ValidationErrors } from "@/main/validation"

let defaultSession: Session = {
}

interface Sessions {
    [key: number]: Session
}

const SESSIONS: Sessions = {}

export const setDefaultSession = (session: Session): void => {
    defaultSession = session
}

export const getSession = (id: number): Session => SESSIONS[id] || defaultSession

export const setSession = async (
    id: number,
    sessionKey: string,
    value: JsonValue,
): Promise<Session> => {
    const schema = SESSION_SCHEMAS.get(sessionKey)
    if (!schema) {
        throw new AppError(`${sessionKey} is not a valid session key`)
    }

    const errors = await schemaValidate(schema, value)
    if (!(errors === null || errors === undefined)) {
        throw new ValidationErrors(`Unable to validate session ${sessionKey}`, errors)
    }

    const { default: lodash } = await import("lodash/fp")
    const session = getSession(id)
    const newSession = lodash.set(sessionKey, value, session)

    SESSIONS[id] = newSession

    return newSession
}
