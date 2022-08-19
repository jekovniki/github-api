export interface IFetch {
    get(url: string, customHeader: any ): Promise<object>
}

export type TErrorMessageResponse = {
    status: number;
    Message: string;
}