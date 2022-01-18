declare class vcCake {
    add (scope: string, fn: Function): void

    getService (name: string): any

    getStorage (name: string): any

    addStorage (name: string, fn: Function): void

    addService (name: string, obj: any): void

    env (key: string, value?: any): any

    start (fn: Function): void

    end (fn: Function): void

    state (): string

    remove (name: string): void

    getData (key: string): any

    setData (key: string, value: any): void

    onDataChange (key: string, fn: Function, options: any): void

    ignoreDataChange (key: string, fn: Function, options: any): void

    getDataAll (): any
}

export module 'vc-cake' {
    export function add (scope: string, fn: Function): void

    export function getService (name: string): any

    export function getStorage (name: string): any

    export function addStorage (name: string, fn: Function): void

    export function addService (name: string, obj: any): void

    export function env (key: string, value?: any): any

    export function start (fn: Function): void

    export function end (fn: Function): void

    export function state (): string

    export function remove (name: string): void

    export function getData (key: string): any

    export function setData (key: string, value: any): void

    export function onDataChange (key: string, fn: Function, options: any): void

    export function ignoreDataChange (key: string, fn: Function, options: any): void

    export function getDataAll (): any
}

declare const _app: vcCake
export default _app
