import { getRepository, getRepositoryBranches } from '../src/controller/get';
import dotenv from 'dotenv';

dotenv.config();

describe('Controller', () => {
    test('+ getRepository | should return TGetRepositoryResponse', async () => {
        const result: any = await getRepository('jekovniki');

        for (const repository of result) {
            expect(repository).toHaveProperty('repositoryName');
            expect(repository).toHaveProperty('ownerLogin');
            expect(repository).toHaveProperty('isForked');
        }
    });

    test('- getRepository | should return TErrorMessageResponse', async () => {
        const result: any = await getRepository('nonExistingUser123');

        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('Message');
        
    });

    test('+ getRepositoryBranches | should return TGetRepositoryResponse', async () => {
        const result: any = await getRepositoryBranches('jekovniki', 'github-api');

        console.log(result);

        expect(result).toBeDefined();
    });
})