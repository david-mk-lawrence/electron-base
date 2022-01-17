import { app, crashReporter, dialog, MessageBoxOptions } from "electron"

export const configureCrashReporter = (remote: boolean): void => {
    crashReporter.start({
        companyName: "companyName",
        productName: "electron-base",
        submitURL: remote ? "" : "",
        uploadToServer: remote,
        compress: true,
    })
}

export const handleError = (error: Error): void => {
    const messageBoxOpts: MessageBoxOptions = {
        type: "error",
        title: "Unexpected Error",
        message: `Encountered unexpected error: ${error.toString()}\n${error.stack}`,
    }
    dialog.showMessageBox(messageBoxOpts)
    app.exit(1)
}
