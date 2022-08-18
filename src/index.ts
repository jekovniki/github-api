import * as _rest from './lib/rest';
import dotenv from 'dotenv';

dotenv.config();

export const rest = new _rest.RestServer({
    // TODO: Fix this
    port: process.env.REST_PORT ?? 'undefined'
})

async function main() {
    _rest.start(rest);
}

main(); 