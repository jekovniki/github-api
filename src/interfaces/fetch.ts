export interface IFetch {
    get(url: string, customHeader: any ): Promise<object>
}

export type ErrorMessageResponse = {
    status: number;
    Message: string;
}