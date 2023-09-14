import { Static, Type } from "@sinclair/typebox";
import { ObjectId } from "../common.dto";

export const AuthResultDto = Type.Object({
    id: ObjectId,
    email: Type.String({ format: 'email' })
});

export type AuthResultDto = Static<typeof AuthResultDto>;