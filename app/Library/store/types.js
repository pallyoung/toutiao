'use strict'
type StoreConfig = {
    name:string,
    defaultValue?:any,
    storage:?boolean,
}

type StorageTool = {
    setter:(key,value)=>Promise,
    getter:(key)=>Promise
}
export type {
    StoreConfig,
    StorageTool
}