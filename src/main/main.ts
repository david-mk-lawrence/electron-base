import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron"
import path from "path"

import { init, ipcHandlers } from "@/main/app"
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
            devTools: isDev,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js"),
            disableBlinkFeatures: "Auxclick",
        },
    })

    win.once("ready-to-show", () => {
        win.show()
        win.focus()
    })

    win.on("closed", onWindowClosed)

    if (isDev) {
        win.loadURL("http://localhost:9080")
    } else {
        win.loadFile("index.html")
    }

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
        registerIpcHandlers(ipcHandlers)
        // registerIpcListeners(ipcListeners)

        // if (isDev) {
        //     try {
        //         await loadExtensions([REACT, REDUX])
        //     } catch (error) {
        //         console.error("Unable to load extensions: " + error)
        //     }
        // }

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

        createAppWindow()
        createMenu(createAppWindow)

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createAppWindow()
            }
        })
    })
    .catch(err => handleError(err))

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
