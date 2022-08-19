import { TErrorMessageResponse } from "../interfaces/fetch";
import { TGetRepositoryResponse } from "../interfaces/get";
import APIRequest from "../lib/fetch";

export async function getRepository(username: string, accept: string = '' ): Promise<TGetRepositoryResponse | TErrorMessageResponse> {
    const githubResponse: any = await APIRequest.get(`https://api.github.com/users/${username}/repos`);
    let response: any = [];

    if('status' in githubResponse) {
        return githubResponse;
    }

    for(const repository of githubResponse) {
        response.push({
            repositoryName: repository.name,
            ownerLogin: repository.owner.login,
            isForked: repository.fork
        });
    }

    return response;
}

// export async function getRepositoryBranches(username: string, repository: string) {
// }