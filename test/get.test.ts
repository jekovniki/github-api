import { getRepository } from '../src/controller/get';

describe('Helpers', async () => {
    test('+ ApiRequest | should fetch data successfully', async () => {
        const result = getRepository('sadda');

        expect(result).toBeDefined();
    })
})