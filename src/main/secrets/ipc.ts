import { IpcHandler, Secret } from "@/common"
import { getSecret, setSecret } from "./secrets"

export const handleGetSecret: IpcHandler = async (_, name: string): Promise<Secret> => {
    const val = await getSecret(name)
    return { name, val }
}

export const handleSetSecret: IpcHandler = async (
    _,
    name: string,
    val: string,
): Promise<Secret> => {
    await setSecret(name, val)
    return { name, val }
}
