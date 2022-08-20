import { TErrorMessageResponse } from "../interfaces/fetch";
import { TGetRepositoryBranchesResponse, TGetRepositoryResponse } from "../interfaces/get";
import APIRequest from "../lib/fetch";
import dotenv from 'dotenv';

dotenv.config();

const API = process.env.REPOSITORY_API;

export async function getRepositoryWithBranches(username: string, accept: Record<string, any>) {
    const repositories: any = await getRepository(username, accept);
    
    if('status' in repositories) {
        return repositories;
    }
    for (const repository of repositories) {
        const branch: any = await getRepositoryBranches(repository.ownerLogin, repository.repositoryName);

        if('status' in branch) {
            return branch;
        }
        
        repository.branches = branch;
    }

    return repositories;
}

export async function getRepository(username: string, accept: Record<string, any> = {} ): Promise<TGetRepositoryResponse[] | TErrorMessageResponse> {
    const data: any = await APIRequest.get(`${API}/users/${username}/repos`, accept);
    let response: any = [];

    if('status' in data) {
        return data;
    }

    for(const repository of data) {
        if (repository.fork === true) {
            continue;
        }
        
        response.push({
            repositoryName: repository.name,
            ownerLogin: repository.owner.login
        });
    }

    return response;
}

export async function getRepositoryBranches(owner: string, repository: string): Promise<TGetRepositoryBranchesResponse[] | TErrorMessageResponse> {
    const branches: any = await APIRequest.get(`${API}/repos/${owner}/${repository}/branches`);
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