import { app } from "electron"
import keytar from "keytar"

const serviceName = app.getName()

export const getSecret = async (name: string): Promise<string> => {
    const val = await keytar.getPassword(serviceName, name)
    if (val === null) {
        return ""
    }

    return val
}

export const setSecret = (name: string, value: string): Promise<void> =>
    keytar.setPassword(serviceName, name, value)

export const deleteSecret = (name: string): Promise<boolean> =>
    keytar.deletePassword(serviceName, name)
