export interface Settings {
    tabs: Array<Tab>
}

export interface Tab {
    splits: Array<Tab> 
}

export interface Split {
    channel: string
}