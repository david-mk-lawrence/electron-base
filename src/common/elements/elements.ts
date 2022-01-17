import { JsonObject } from "@/common/json"

export interface Element extends JsonObject {
    id: string
    context: string // "global" | route
}

export const ELEMENTS: { [context: string]: { [id: string]: Element } } = {
    global: {},
}
