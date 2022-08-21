import { TErrorMessageResponse } from "../interfaces/fetch";

export function handleErrors(error: Record<string, any>): TErrorMessageResponse {
    console.log(`Status: ${error?.response?.status}; Message: ${error.message}: ${error?.response?.statusText}`);

    return {
        status: error?.response?.status,
        Message: `${error?.message}:${error?.response?.statusText}`
    }
}

export function combineTwoArrays(acceptingArray: Array<Record<string, any>>, givingArray: Array<Record<string, any>>, propertyName: string): Array<Record<string, any>> {
    let iterations = 0;

    for (const object of acceptingArray) {
        object[propertyName] = givingArray[iterations];
        iterations++;
    }

    return acceptingArray;
}