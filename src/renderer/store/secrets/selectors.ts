import { Secret } from "@/common"
import { Selector } from "@/renderer/store/state"

export const selectSpotifyClientId: Selector<Secret | undefined> = state =>
    state.secrets.spotifyClientId

export const selectSpotifyClientSecret: Selector<Secret | undefined> = state =>
    state.secrets.spotifyClientSecret

export const selectSecretsError: Selector<Error | undefined> = state =>
    state.secrets.error
