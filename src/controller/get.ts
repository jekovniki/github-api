import { TErrorMessageResponse } from "../interfaces/fetch";
import { TGetRepositoryBranchesResponse, TGetRepositoryResponse } from "../interfaces/get";
import APIRequest from "../lib/fetch";

export async function getRepository(username: string, accept: string = '' ): Promise<TGetRepositoryResponse[] | TErrorMessageResponse> {
    const data: any = await APIRequest.get(`https://api.github.com/users/${username}/repos`);
    let response: any = [];

    if('status' in data) {
        return data;
    }

    for(const repository of data) {
        response.push({
            repositoryName: repository.name,
            ownerLogin: repository.owner.login,
            isForked: repository.fork
        });
    }

    return response;
}

export async function getRepositoryBranches(owner: string, repository: string): Promise<TGetRepositoryBranchesResponse[] | TErrorMessageResponse> {
    const branches: any = await APIRequest.get(`https://api.github.com/repos/${owner}/${repository}/branches`);
    let response = [];

    if('status' in branches) {
        return branches;
    }

    for(const branch of branches) {
        response.push({
            name: branch.name,
            lastCommitSha: branch.commit.sha
        });
    }

    return response;
}