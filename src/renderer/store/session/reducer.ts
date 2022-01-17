import { SessionState } from "./state"
import {
    RECEIVE_SESSION,
    SESSION_ERROR,
    CLEAR_SESSION_ERROR,
    SessionActions,
} from "./types"

const initState: SessionState = {
    session: undefined,
    error: undefined,
}

export const sessionReducer = (
    state: SessionState = initState,
    action: SessionActions,
): SessionState => {
    switch (action.type) {
        case RECEIVE_SESSION:
            return {
                ...state,
                session: action.payload,
            }
        case SESSION_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case CLEAR_SESSION_ERROR:
            return {
                ...state,
                error: undefined,
            }
        default:
            return state
    }
}
