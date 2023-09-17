import { FastifyInstance } from "fastify";
import { verifyToken } from "../../hooks/verifyToken.hook";
import { userPlugin } from "./user.plugin";

export async function apiPlugin(app: FastifyInstance) {
    app.addHook('onRequest', verifyToken);
    app.register(userPlugin, { prefix: '/user' });
}