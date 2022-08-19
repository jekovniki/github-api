import { ErrorMessageResponse } from "../interfaces/fetch";

export function handleErrors(error: Record<string, any>): ErrorMessageResponse {
    console.log(`Status: ${error.status}; Message: ${error.message}: ${error.code}`);

    return {
        status: error.status,
        Message: `${error.message}:${error.statusText}`
    }
}