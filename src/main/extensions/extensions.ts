import path from "path"
import os from "os"

export interface Extension {
    id: string
    version: string
}

export const REDUX: Extension = {
    id: "lmhkpmbekcpmknklioeibfkpmmfibljd",
    version: "2.17.0_0",
}

export const REACT: Extension = {
    id: "fmkadmapgofadopljbjfkapdkoienihi",
    version: "4.10.1_0",
}

export const getOSExtensionDir = (): string => {
    if (process.platform === "darwin") {
        return "/Library/Application Support/Google/Chrome/Default/Extensions"
    }

    throw new Error("Extension loading only supported on MacOS")
}

export const getExtensionDir = (extension: Extension): string =>
    path.join(os.homedir(), getOSExtensionDir(), extension.id, extension.version)
