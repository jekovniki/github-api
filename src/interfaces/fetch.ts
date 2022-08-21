export interface IFetch {
    get(url: string, customHeader: any ): Promise<any>
    post(url: string, customHeader: any, data: any): Promise<any>
}

export type TErrorMessageResponse = {
    status: number;
    Message: string;
}