import { AuthInputDto } from "../../dtos/in/auth.dto";
import { AuthResultDto } from "../../dtos/out/auth.dto";
import { authHandler } from "../../handlers/auth.handler";
import { createRoutes } from "../../utils/createRoutes";

export const authPlugin = createRoutes('Auth', [
    {
        method: 'POST',
        url: '/login',
        schema: {
            body: AuthInputDto,
            response: {
                200: AuthResultDto
            }
        },
        handler: authHandler.login
    },
    {
        method: 'POST',
        url: '/signup',
        schema: {
            body: AuthInputDto,
            response: {
                200: AuthResultDto
            }
        },
        handler: authHandler.signup
    }
]);