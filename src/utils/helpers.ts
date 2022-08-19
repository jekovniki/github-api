import { TErrorMessageResponse } from "../interfaces/fetch";

export function handleErrors(error: Record<string, any>): TErrorMessageResponse {
    console.log(`Status: ${error.response.status}; Message: ${error.message}: ${error.response.statusText}`);

    return {
        status: error.response.status,
        Message: `${error.message}:${error.response.statusText}`
    }
}