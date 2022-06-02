import { app, crashReporter, dialog, MessageBoxOptions } from "electron"

import log from "electron-log"

export const configureCrashReporter = (remote: boolean): void => {
    crashReporter.start({
        companyName: "companyName",
        productName: "rfid-player",
        submitURL: remote ? "" : "",
        uploadToServer: false,
        compress: true,
    })
}

export const handleError = (error: Error): void => {
    const msg = `Encountered unexpected error: ${error.toString()}\n${error.stack}`
    log.error(msg)
    const messageBoxOpts: MessageBoxOptions = {
        type: "error",
        title: "Unexpected Error",
        message: msg,
    }
    dialog.showMessageBox(messageBoxOpts)
    app.exit(1)
}
