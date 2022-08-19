import { getRepository } from '../src/controller/get';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

describe('Helpers', () => {
    test('+ ApiRequest | should fetch data successfully', async () => {
        const result = await getRepository('jekovniki');
        console.log(result);
        expect(result).toBeDefined();
    });
    // test('test', async () => {
    //     const token = process.env.PUBLIC_ACCESS_TOKEN;
    //     const result = await axios.get(`https://api.github.com/users/jekovniki/repos`);
    //     console.log(result.data);
    //     expect(result).toBeDefined();
    // })
})