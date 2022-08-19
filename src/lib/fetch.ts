import axios from 'axios';
import dotenv from 'dotenv';
import { ErrorMessageResponse, IFetch } from '../interfaces/fetch';
import { handleErrors } from '../utils/helpers';

dotenv.config();

const token = process.env.PUBLIC_ACCESS_TOKEN ?? '';

class APIRequest implements IFetch {
    private token: string;

    constructor(publicAccessToken: string) {
        this.token = publicAccessToken;
    }
    
    public async get(url: string, config: any = {}): Promise<Record<any, string> | ErrorMessageResponse> {
        try {
            const requestInstance = axios.create({
                headers: {
                    'Authorization': `${this.token}`
                }
            });
            const result = await requestInstance.get(`${url}`);
            
            if (result.status !== 200 && result.status !== 201) {
                return handleErrors(result);
            }

            return result.data;
        } catch (error) {
            return handleErrors(error);
        }
    }
}

export default new APIRequest(token);