export const ERROR = "ERROR"

export type AppErrors = typeof ERROR

export interface SerializedError {
    name: string
    message: string
    extra: any
    errorType: AppErrors
}

export interface SerializableError extends Error {
    serialize: () => SerializedError
}
