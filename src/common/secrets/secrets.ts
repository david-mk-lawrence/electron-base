import { JsonObject } from "@/common/json"

export interface Secret extends JsonObject {
    name: string
    val: string
}
