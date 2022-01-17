import { Session } from "@/common"
import { Selector } from "@/renderer/store/state"

export const selectSession: Selector<Session | undefined> = state =>
    state.session.session

export const selectSessionError: Selector<Error | undefined> = state =>
    state.session.error
