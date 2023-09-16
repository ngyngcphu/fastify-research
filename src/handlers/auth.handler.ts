import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { Handler } from "../interfaces/handler";
import { AuthInputDto } from "../dtos/in/auth.dto";
import { AuthResultDto } from "../dtos/out/auth.dto";
import { prisma } from "../repositories/prisma";
import { USER_NOT_FOUND, LOGIN_FAIL, DUPLICATED_EMAIL } from "../constants/errorMessages";
import { cookieOptions } from '../constants/cookie';
import { SALT_ROUNDS } from '../constants/crypt';
import { envs } from '../configs/env';
import { logger } from '../utils/logger';

const login: Handler<AuthResultDto, { Body: AuthInputDto }> = async (req, res) => {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            password: true
        },
        where: { email: req.body.email }
    });
    if (!user) return res.badRequest(USER_NOT_FOUND);
    const correctPassword = await compare(req.body.password, user.password);
    if (!correctPassword) return res.badRequest(LOGIN_FAIL);

    const userToken = jwt.sign({ userId: user.id }, envs.JWT_SECRET);
    res.setCookie('token', userToken, cookieOptions);
    return {
        id: user.id,
        email: user.email
    };
}

const signup: Handler<AuthResultDto, { Body: AuthInputDto }> = async (req, res) => {
    const hashPassword = await hash(req.body.password, SALT_ROUNDS);
    let user: User;
    try {
        user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashPassword
            }
        });
    } catch (err) {
        logger.info(err);
        return res.badRequest(DUPLICATED_EMAIL);
    }

    const userToken = jwt.sign({ userId: user.id }, envs.JWT_SECRET);
    res.setCookie('token', userToken, cookieOptions);

    return {
        id: user.id,
        email: user.email
    };
};

export const authHandler = {
    login,
    signup
};