export interface IFetch {
    get: (url: string) => Promise<object>
}