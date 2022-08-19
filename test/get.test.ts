import { getRepository, getRepositoryBranches } from '../src/controller/get';
import dotenv from 'dotenv';

dotenv.config();

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

describe('Controller', () => {
    test('+ getRepository | should return TGetRepositoryResponse', async () => {
        const result: any= await getRepository(successfullRequest.username, successfullRequest.header);

        successfullRequest.repository = result[0].repositoryName;

        for (const repository of result) {
            expect(repository).toHaveProperty('repositoryName');
            expect(repository).toHaveProperty('ownerLogin');
            expect(repository).toHaveProperty('isForked');
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
});