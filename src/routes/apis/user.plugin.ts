import { UserDto } from "../../dtos/out/user.dto";
import { userHandler } from "../../handlers/user.handler";
import { createRoutes } from "../../utils/createRoutes";

export const userPlugin = createRoutes('User', [
    {
        method: 'GET',
        url: '',
        schema: {
            response: {
                200: UserDto
            }
        },
        handler: userHandler.getUserById
    }
]);