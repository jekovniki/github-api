import APIRequest from "../lib/fetch";

export async function getRepository(username: string, headers: object = {}) {
    const result = APIRequest.get(`https://api.github.com/users/${username}/repos`, { headers });

    return result;
}