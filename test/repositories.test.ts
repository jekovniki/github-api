import axios from 'axios';
import { getRepository, getRepositoryBranches, getRepositoryWithBranches } from '../src/controller/repositories';

const successfullRequest = {
    username: 'jekovniki',
    repository: '',
    header: {
        Accept: 'application/json'
    }
}

const failedRequest = {
    username: 'nonExistingUser123',
    header: {
        Accept: 'application/xml'
    }
}

describe('Unit testing', () => {
    test('+ getRepository | should return TGetRepositoryResponse', async () => {
        const result: any= await getRepository(successfullRequest.username, successfullRequest.header);
        successfullRequest.repository = result[0].repositoryName;

        for (const repository of result) {
            expect(repository).toHaveProperty('repositoryName');
            expect(repository).toHaveProperty('ownerLogin');
        }
    });

    test('- getRepository | should return TErrorMessageResponse: code 406', async () => {
        const result: any = await getRepository(successfullRequest.username, failedRequest.header);

        expect(result).toHaveProperty('status');
        expect(result.status).toBe(406);
        expect(result).toHaveProperty('Message');
    });

    test('- getRepository | should return TErrorMessageResponse: code 404', async () => {
        const result: any = await getRepository(failedRequest.username);

        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('Message');

    });

    test('+ getRepositoryBranches | should return TGetRepositoryResponse', async () => {
        const result: any = await getRepositoryBranches(successfullRequest.username, successfullRequest.repository);

        for (const brach of result) {
            expect(brach).toHaveProperty('name');
            expect(brach).toHaveProperty('lastCommitSha');
        }
    });

    test('- getRepositoryBranches | should return TErrorMessageResponse', async () => {
        const result: any = await getRepositoryBranches(failedRequest.username, successfullRequest.repository);

        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('Message');
    });

    test('+ getRepositoryWithBranches | should return success', async () => {
        const array: any = await getRepositoryWithBranches(successfullRequest.username, successfullRequest.header);

        for (const result of array) {
            expect(result).toHaveProperty('repositoryName');
            expect(result).toHaveProperty('branches');
            expect(result.branches[0]).toHaveProperty('lastCommitSha');
        }
    });
});

describe('Integration testing', () => {
    test('+ POST /repositories/get | should return successfull response', async () => {

    });
    test('- POST /repositories/get | should return failed response - 406', async () => {

    });
    test('- POST /repositories/get | should return failed response - 404', async () => {

    });
})