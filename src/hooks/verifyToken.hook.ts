import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { INVALID_TOKEN, MUST_LOGIN_FIRST } from "../constants/errorMessages";
import { envs } from "../configs/env";

export async function verifyToken(req: FastifyRequest, res: FastifyReply) {
    const token = req.cookies.token;
    if (!token) return res.unauthorized(MUST_LOGIN_FIRST);

    try {
        const decodePayload: string | jwt.JwtPayload = jwt.verify(token, envs.JWT_SECRET);
        req.userId = decodePayload['useId'];
        return;
    } catch (err) {
        req.log.info(err);
        return res.forbidden(INVALID_TOKEN);
    }
}