export class AppError extends Error {
    constructor(message: string) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isError = (error: any): error is Error =>
    error &&
    typeof error === "object" &&
    "message" in error &&
    "stack" in error &&
    typeof error.message === "string" &&
    typeof error.stack === "string"
