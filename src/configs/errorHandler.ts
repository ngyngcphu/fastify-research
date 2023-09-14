import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import { NOT_FOUND_GENERIC, TRY_LATER } from "../constants/errorMessages";

export function customErrorHandler(err: FastifyError, _req: FastifyRequest, res: FastifyReply) {
    if (err.statusCode === undefined) {
        if (err.name === 'NotFoundError' || err.code === 'P2025') {
            err.statusCode = 400;
            err.message = NOT_FOUND_GENERIC;
            return res.send(err);
        }
        err.statusCode = 500;
    }

    if (err.statusCode >= 500) {
        err.message = TRY_LATER;
        return res.send(err);
    }

    if (!err.validation || err.validation.length === 0) {
        return res.send(err);
    }

    const validation = err.validation[0];
    if (validation.keyword === 'required') {
        return res.send(err);
    } else if (validation.instancePath.length === 0) {
        err.message = 'Invalid path parameters !';
        res.send(err);
    }
}

