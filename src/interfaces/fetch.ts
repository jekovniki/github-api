export interface IFetch {
    get(url: string, config?: any ): Promise<object>
}

export type ErrorMessageResponse = {
    status: number;
    Message: string;
}