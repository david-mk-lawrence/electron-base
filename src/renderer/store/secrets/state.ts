import { Secret } from "@/common"

export interface SecretsState {
    spotifyClientId?: Secret
    spotifyClientSecret?: Secret
    error?: Error
}
