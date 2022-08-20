import { RestServer } from './lib/rest';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = process.env.REST_PORT ?? '3000';
const server = express();

export const rest = new RestServer({ port, server });

async function main() {
    rest.start();
}

main(); 