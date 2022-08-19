export type TGetRepositoryResponse = {
    repositoryName: string;
    ownerLogin: string;
    isForked: boolean;
}

export type TGetRepositoryBranchesResponse = {
    name: string;
    lastCommitSha: string;
}