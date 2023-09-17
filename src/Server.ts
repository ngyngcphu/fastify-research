import fastify, { FastifyInstance } from "fastify";
import type { FastifyCookieOptions } from '@fastify/cookie';
import { loggerConfig } from "./configs/logger";
import { CORS_WHITE_LIST, envs } from "./configs/env";
import { swaggerConfig, swaggerUIConfig } from "./configs/swagger";
import { customErrorHandler } from "./configs/errorHandler";
import { authPlugin } from "./routes/auth";
import { apiPlugin } from "./routes/apis";

export function createServer(config: ServerConfig): FastifyInstance {
    const app = fastify({ logger: loggerConfig[envs.NODE_ENV] });

    app.register(import('@fastify/sensible'));
    app.register(import('@fastify/helmet'));
    app.register(import('@fastify/cors'), {
        origin: CORS_WHITE_LIST
    });
    app.register(import('@fastify/cookie'), {
        secret: envs.COOKIE_SECRET,
        hook: 'onRequest'
    } as FastifyCookieOptions);

    if (envs.isDev) {
        app.register(import('@fastify/swagger'), swaggerConfig);
        app.register(import('@fastify/swagger-ui'), swaggerUIConfig);
    }

    app.register(authPlugin, { prefix: '/auth' });
    app.register(apiPlugin, { prefix: '/api' });

    app.setErrorHandler(customErrorHandler);

    const shutdown = async () => {
        await app.close();
    }

    const start = async () => {
        await app.listen({
            host: config.host,
            port: config.port
        });
        await app.ready();
        if (!envs.isProd) {
            app.swagger({ yaml: true }),
            app.log.info(`Swagger documentation is on http://${config.host}:${config.port}/docs`);
        }
    };

    return {
        ...app,
        start,
        shutdown
    }
}