import { session, Extension as ElectronExtension } from "electron"
import { Extension, getExtensionDir } from "./extensions"

export const loadExtensions = async (
    extensions: Extension[],
): Promise<ElectronExtension[]> =>
    Promise.all(
        extensions.map(extension =>
            session.defaultSession.loadExtension(getExtensionDir(extension), {
                allowFileAccess: true,
            }),
        ),
    )
