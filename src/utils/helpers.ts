
export async function handleErrors(error: any) {
    console.log(`Status: ${error.code}; Message: ${error.message}`);

    return {
        status: error.code,
        Message: error.message
    }
}