import { Static, Type } from "@sinclair/typebox"; 
import { ObjectId } from "../common.dto";

export const UserDto = Type.Object({
    id: ObjectId,
    email: Type.String({ format: 'email' })
});

export type UserDto = Static<typeof UserDto>;