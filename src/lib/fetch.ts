import axios from 'axios';
import dotenv from 'dotenv';
import { TErrorMessageResponse, IFetch } from '../interfaces/fetch';
import { handleErrors } from '../utils/helpers';

dotenv.config();

const token = process.env.PERSONAL_ACCESS_TOKEN ?? '';

class APIRequest implements IFetch {
    private token: string;

    constructor(publicAccessToken: string) {
        this.token = publicAccessToken;
    }

    public async get(url: string, customHeader: Record<string, any> = {}): Promise<any> {
        try {
            const requestInstance = axios.create({
                headers: {
                    'Authorization': `${this.token}`,
                    ...customHeader
                }
            });
            const result = await requestInstance.get(url);

            return result.data;
        } catch (error) {
            return handleErrors(error);
        }
    }

    public async post(url: string, customHeader: Record<string, any> = {}, data: Record<string, any> = {}): Promise<any> {
        try {
            const requestInstance = axios.create({
                headers: { ...customHeader }
            });

            return await requestInstance.post(url, data);
        } catch (error) {
            return handleErrors(error);
        }
    }
}

export default new APIRequest(token);