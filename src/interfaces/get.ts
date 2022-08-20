export type TGetRepositoryResponse = {
    repositoryName: string;
    ownerLogin: string;
}

export type TGetRepositoryBranchesResponse = {
    name: string;
    lastCommitSha: string;
}