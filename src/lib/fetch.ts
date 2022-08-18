import axios from 'axios';
import dotenv from 'dotenv';
import { IFetch } from '../interfaces/fetch';
import { handleErrors } from '../utils/helpers';

dotenv.config();

const authorizationToken = process.env.PERSONAL_ACCESS_TOKEN ?? '';

class APIRequest {
    public static async get(url: string, config: object = {}): Promise<any> {
        try { 
            const result: any = await axios.get(`${url}`, config);

            /**
             * headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                    'Accept': accept,
                    'Content-Type': 'application/json'
                }
             */
            
            if (result.status !== 200) {
                return handleErrors(result);
            }

            if (result.status !== 201) {
                return handleErrors(result);
            }

            return result.data;
        } catch (error) {
            return handleErrors(error);
        }
    }
}

export default APIRequest;