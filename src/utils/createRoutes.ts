import { FastifyInstance, RouteOptions } from "fastify";

export function createRoutes(swaggerTag: HandlerTag, routesOptions: RouteOptions[]) {
    return async function (app: FastifyInstance) {
        routesOptions.forEach((options) => {
            app.route({
                ...options,
                schema: {
                    ...options.schema,
                    tags: [swaggerTag]
                },
                exposeHeadRoute: false
            });
        });
    };
}