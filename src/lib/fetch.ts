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

    public async get(url: string, customHeader: Record<string, any> = {}): Promise<Record<any, string> | TErrorMessageResponse> {
        try {
            if ('Accept' in customHeader && customHeader.Accept === 'application/xml') {
                return handleErrors({
                    response: {
                        status: 406,
                        statusText: 'Not Acceptable'
                    },
                    message: 'Request is not supported from the server'
                })
            }
            const requestInstance = axios.create({
                headers: {
                    'Authorization': `${this.token}`,
                    ...customHeader
                }
            });
            const result = await requestInstance.get(url);

            return result.data;
        } catch (error: any) {
            return handleErrors(error);
        }
    }
}

export default new APIRequest(token);