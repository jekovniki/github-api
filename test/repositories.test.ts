import dotenv from 'dotenv';
import { getRepository, getRepositoryBranches, getRepositoryWithBranches } from '../src/controller/repositories';
import APIRequest from "../src/lib/fetch";

dotenv.config();

const successfullRequest = {
    username: 'jekovniki',
    repository: '',
    Accept: 'application/json'
}

const failedRequest = {
    username: 'nonExistingUser123',
    Accept: 'application/xml'
}

describe('Unit testing', () => {
    test('+ getRepository | should return TGetRepositoryResponse', async () => {
        const result: any= await getRepository(successfullRequest.username, successfullRequest.Accept);
        successfullRequest.repository = result[0].name;

        for (const repository of result) {
            expect(repository).toHaveProperty('name');
            expect(repository).toHaveProperty('owner');
        }
    });

    test('- getRepository | should return TErrorMessageResponse: code 415', async () => {
        const result: any = await getRepository(successfullRequest.username, failedRequest.Accept);

        expect(result).toHaveProperty('status');
        expect(result.status).toBe(415);
        expect(result).toHaveProperty('Message');
    });

    test('- getRepository | should return TErrorMessageResponse: code 404', async () => {
        const result: any = await getRepository(failedRequest.username, successfullRequest.Accept);

        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('Message');

    });

    test('+ getRepositoryBranches | should return TGetRepositoryResponse', async () => {
        const result: any = await getRepositoryBranches(successfullRequest.username, successfullRequest.repository);

        for (const branch of result) {
            expect(branch).toHaveProperty('name');
            expect(branch).toHaveProperty('commitSHA');
        }
    });

    test('- getRepositoryBranches | should return TErrorMessageResponse', async () => {
        const result: any = await getRepositoryBranches(failedRequest.username, successfullRequest.repository);

        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('Message');
    });

    test('+ getRepositoryWithBranches | should return success', async () => {
        const array: any = await getRepositoryWithBranches(successfullRequest.username, successfullRequest.Accept);

        for (const result of array) {
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('branches');
            expect(result.branches[0]).toHaveProperty('commitSHA');
        }
    });
});

describe('Integration testing', () => {
    const baseUrl = `${process.env.REST_HOST}:${process.env.REST_PORT}`;

    test('+ GET /health-check | should return status: online', async () => {
        const healthCheck: any = await APIRequest.get(`${baseUrl}/health-check`);

        expect(healthCheck).toHaveProperty('status');
        expect(healthCheck.status).toBe('online');
    });

    test('+ POST /repositories/get | should return successfull response', async () => {
        const response: any = await APIRequest.post(`${baseUrl}/repositories/get`, {}, {
            username: successfullRequest.username,
            Accept: successfullRequest.Accept
        });

        expect(response.data[0]).toHaveProperty('name');
        expect(response.data[0]).toHaveProperty('owner');
        expect(response.data[0]).toHaveProperty('branches');
    });
    test('- POST /repositories/get | should return failed response - 406', async () => {
        const response: any = await APIRequest.post(`${baseUrl}/repositories/get`, {}, {
            username: successfullRequest.username,
            Accept: failedRequest.Accept
        });

        expect(response.data).toHaveProperty('status');
        expect(response.data).toHaveProperty('Message');
        expect(response.data.status).toStrictEqual(406);
    });
    test('- POST /repositories/get | should return failed response - 404', async () => {
        const response: any = await APIRequest.post(`${baseUrl}/repositories/get`, {}, {
            username: failedRequest.username,
            Accept: successfullRequest.Accept
        });

        expect(response.data).toHaveProperty('status');
        expect(response.data).toHaveProperty('Message');
        expect(response.data.status).toStrictEqual(404);
    });
})