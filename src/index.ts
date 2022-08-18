import * as _rest from './lib/rest';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.REST_PORT ?? '3000'

export const rest = new _rest.RestServer({ port });

async function main() {
    _rest.start(rest);
}

main(); 