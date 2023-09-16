import { Handler } from "../interfaces/handler";
import { UserDto } from "../dtos/out/user.dto";
import { prisma } from "../repositories/prisma";
import { USER_NOT_FOUND } from "../constants/errorMessages";

const getUserById: Handler<UserDto> = async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true
        },
        where: { id: userId }
    });
    if (user === null) return res.badRequest(USER_NOT_FOUND);
    return user;
};

export const userHandler = {
    getUserById
};