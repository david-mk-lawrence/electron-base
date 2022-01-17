import { JsonObject } from "@/common/json"

export interface Route extends JsonObject {
    name: string
    path: string[]
}

export const ROUTES: { [location: string]: Route } = {
    home: {
        name: "home",
        path: [""],
    },
    settings: {
        name: "settings",
        path: ["settings"],
    },
}

export const routeToPath = (route: Route): string => "/" + route.path.join("/")
