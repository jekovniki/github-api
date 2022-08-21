import { TErrorMessageResponse } from "../interfaces/fetch";
import { TGetRepositoryBranchesResponse, TGetRepositoryResponse } from "../interfaces/get";
import APIRequest from "../lib/fetch";
import dotenv from 'dotenv';
import { combineTwoArrays } from "../utils/helpers";

dotenv.config();

const API = process.env.REPOSITORY_API;

export async function getRepositoryWithBranches(username: string, Accept: string) {
    const repositories = await getRepository(username, Accept);
    const branches: any = [];
    if('status' in repositories) {
        return repositories;
    }

    for (const repository of repositories) {
        const branch = getRepositoryBranches(repository.owner, repository.name);
        if('status' in branch) {
            return branch;
        }

        branches.push(branch);
    }
    
    const allBranches = await Promise.all(branches);
    
    return combineTwoArrays(repositories, allBranches, 'branches');
}

export async function getRepository(username: string, Accept: string ): Promise<TGetRepositoryResponse[] | TErrorMessageResponse> {
    const repositories = await APIRequest.get(`${API}/users/${username}/repos`, { Accept });
    let response: any = [];

    if('status' in repositories) {
        return repositories;
    }

    for(const repository of repositories) {
        if (repository.fork === true) {
            continue;
        }
        
        response.push({
            name: repository.name,
            owner: repository.owner.login
        });
    }

    return response;
}

export async function getRepositoryBranches(owner: string, repository: string): Promise<TGetRepositoryBranchesResponse[] | TErrorMessageResponse> {
    const branches = await APIRequest.get(`${API}/repos/${owner}/${repository}/branches`);
    let response = [];
    
    if('status' in branches) {
        return branches;
    }

    for(const branch of branches) {
        response.push({
            name: branch.name,
            commitSHA: branch.commit.sha
        });
    }

    return response;
}