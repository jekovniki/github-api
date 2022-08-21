import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { RestServer } from "../lib/rest";
import { getRepositoryWithBranches } from "../controller/repositories";
import { handleErrors } from "../utils/helpers";

export async function setRoutes(rest: RestServer) {
    const server= rest.getServer();
    const swaggerDocument = YAML.load('swagger.yaml');

    server.use(bodyParser.json());
    server.use('api-docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument));

    server.get(`/health-check`, healthCheck);

    server.post('/repositories/get', getRepositories);

}

export function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    response.send({
        status: 'online'
    })
}

export async function getRepositories(request: Record<string, any>, response: Record<string, any>): Promise<void> {
    try {
        const apiRequest = request.body;

        if (!apiRequest.username || !apiRequest.Accept) {
            response.json(handleErrors({
                response: {
                    status: 400,
                    statusText: 'BAD REQUEST'
                },
                message: 'Please provide proper request'
            }));
        }

        response.json(await getRepositoryWithBranches(apiRequest.username, apiRequest.Accept));

    } catch (error: any) {
        response.json(handleErrors(error));
    }
}