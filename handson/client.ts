import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";

class Client {
    authMiddlewareOptions: AuthMiddlewareOptions;
    httpMiddlewareOptions: HttpMiddlewareOptions;
    ctpClient: any;
    apiRoot: any;
    constructor() {
        // Configure authMiddlewareOptions
        this.authMiddlewareOptions = {
            host: readConfig(Prefix.DEV).oauthHost,
            projectKey: readConfig(Prefix.DEV).projectKey,
            credentials: {
                clientId: readConfig(Prefix.DEV).clientId,
                clientSecret: readConfig(Prefix.DEV).clientSecret,
            },
            scopes: [readConfig(Prefix.DEV).scopes],
            fetch,
        };

        // Configure httpMiddlewareOptions
        this.httpMiddlewareOptions = {
            host: readConfig(Prefix.DEV).host,
            fetch,
        };

        // Export the ClientBuilder
        this.ctpClient = new ClientBuilder()
            .withClientCredentialsFlow(this.authMiddlewareOptions)
            .withHttpMiddleware(this.httpMiddlewareOptions)
            .build();
    }

    createApiClient = (client: any) => createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: readConfig(Prefix.DEV).projectKey });

    createImportApiClient = (client: any) => createImportApiBuilderFromCtpClient(client).withProjectKeyValue({ projectKey: readConfig(Prefix.DEV).projectKey });

    createStoreApiClient = (client: any) => createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: readConfig(Prefix.DEV).projectKey });

    createMyApiClient = () => {
        const authMiddlewareOptions = {
            host: readConfig(Prefix.DEV).oauthHost,
            projectKey: readConfig(Prefix.DEV).projectKey,
            credentials: {
                clientId: readConfig(Prefix.DEV).clientId,
                clientSecret: readConfig(Prefix.DEV).clientSecret,
                user: {
                    username: readConfig(Prefix.DEV).username,
                    password: readConfig(Prefix.DEV).password
                }
            },
            scopes: [readConfig(Prefix.DEV).scopes],
            fetch,
        };

        const httpMiddlewareOptions = {
            host: readConfig(Prefix.DEV).host,
            fetch,
        };

        const client = new ClientBuilder()
        .withPasswordFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
        return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: readConfig(Prefix.DEV).projectKey });
    }
}

const client = new Client();
export const apiRoot: ApiRoot = client.createApiClient(client.ctpClient);
export const importApiRoot: ImportApiRoot = client.createImportApiClient(client.ctpClient);
export const storeApiRoot: ApiRoot = client.createStoreApiClient(client.ctpClient);
export const myApiRoot: ApiRoot = client.createMyApiClient();