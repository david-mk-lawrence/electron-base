import { SecretsState } from "./state"
import {
    RECEIVE_SECRET,
    SECRET_ERROR,
    CLEAR_SECRET_ERROR,
    HIDE_SECRET,
    SecretActions,
} from "./types"

const initState: SecretsState = {
    spotifyClientId: undefined,
    spotifyClientSecret: undefined,
    error: undefined,
}

export const secretsReducer = (
    state: SecretsState = initState,
    action: SecretActions,
): SecretsState => {
    let next: SecretsState
    switch (action.type) {
        case RECEIVE_SECRET:
            next = {
                ...state,
            }

            switch (action.payload.name) {
                case "spotifyClientId":
                    next.spotifyClientId = action.payload
                    return next
                case "spotifyClientSecret":
                    next.spotifyClientSecret = action.payload
                    return next
            }

            return next
        case HIDE_SECRET:
            next = {
                ...state,
            }

            switch (action.payload) {
                case "spotifyClientId":
                    next.spotifyClientId = undefined
                    return next
                case "spotifyClientSecret":
                    next.spotifyClientSecret = undefined
                    return next
            }

            return next
        case SECRET_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case CLEAR_SECRET_ERROR:
            return {
                ...state,
                error: undefined,
            }
        default:
            return state
    }
}
