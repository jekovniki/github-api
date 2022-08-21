export type TGetRepositoryResponse = {
    name: string;
    owner: string;
    branches: TGetRepositoryBranchesResponse[];
}

export type TGetRepositoryBranchesResponse = {
    name: string;
    commitSHA: string;
}