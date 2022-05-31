import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron"

import { init, ipcHandlers, handleOpenUrl } from "@/main/app"
import { configureCrashReporter, handleError } from "@/main/errors"
import { loadExtensions, REACT, REDUX } from "@/main/extensions"
import { registerIpcHandlers } from "@/main/ipc"

process.on("uncaughtException", handleError)
process.on("unhandledRejection", handleError)

const isDev = process.env.NODE_ENV === "development"
configureCrashReporter(!isDev)

const createWindow = (
    onWindowClosed: () => void,
    x?: number,
    y?: number,
): BrowserWindow => {
    const win: BrowserWindow | null = new BrowserWindow({
        x,
        y,
        width: 800,
        height: 600,
        show: false,
        titleBarStyle: "hiddenInset",
        webPreferences: {
            nodeIntegrationInSubFrames: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            disableBlinkFeatures: "Auxclick",
        },
    })

    win.once("ready-to-show", () => {
        win.show()
        win.focus()
        if (isDev) {
            win.webContents.toggleDevTools()
        }
    })

    win.on("closed", onWindowClosed)

    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    return win
}

const createMenu = (onNewWindow: () => void) => {
    const template: MenuItemConstructorOptions[] = [
        {
            label: app.name,
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services" },
                { type: "separator" },
                { role: "hide" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" },
            ],
        },
        {
            label: "File",
            submenu: [
                {
                    label: "New Window",
                    accelerator: "Ctrl+N",
                    click: onNewWindow,
                },
                { type: "separator" },
                { role: "close" },
            ],
        },
        {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" },
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forceReload" },
                { role: "toggleDevTools" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        {
            label: "Window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                { type: "separator" },
                { role: "front" },
                { type: "separator" },
                { role: "window" },
            ],
        },
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.whenReady()
    .then(async () => {
        await init()

        if (isDev) {
            try {
                await loadExtensions([REACT, REDUX])
            } catch (error) {
                console.error("Unable to load extensions: " + error)
            }
        }

        const windows = new Set()

        const createAppWindow = (): BrowserWindow => {
            let x: number | undefined, y: number | undefined
            const currentWindow = BrowserWindow.getFocusedWindow()
            if (currentWindow) {
                const [currentX, currentY] = currentWindow.getPosition()
                x = currentX + 24
                y = currentY + 24
            }

            let window: BrowserWindow | null = createWindow(
                () => {
                    windows.delete(window)
                    window = null
                },
                x,
                y,
            )
            windows.add(window)

            return window
        }

        registerIpcHandlers(ipcHandlers)

        createAppWindow()
        createMenu(createAppWindow)

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createAppWindow()
            }
        })
    })
    .catch(err => handleError(err))

app.on("open-url", handleOpenUrl)

app.on("web-contents-created", (_, contents) => {
    contents.setWindowOpenHandler(() => ({ action: "deny" }))

    contents.on("will-navigate", (event, _) => {
        event.preventDefault()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
