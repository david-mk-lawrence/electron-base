import { Settings, Session } from "@/common"

export interface HasChildren {
    children: React.ReactNode
}

export interface AppProps {
    settings: Settings
    session: Session
}
