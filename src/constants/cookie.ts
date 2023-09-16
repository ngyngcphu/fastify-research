import { envs } from "../configs/env";

export const cookieOptions = {
    signed: false,
    secure: envs.isProduction,
    path: '/',
    httpOnly: true
};