import { hashSync } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const user = {
    email: 'phu.nguyen2310@hcmut.edu.vn',
    password: '123456789'
}

async function generateSampleData() {
    const hashPassword = hashSync(user.password, SALT_ROUNDS);
    const sampleUser = await prisma.user.create({
        data: {
            email: user.email,
            password: hashPassword
        }
    });
    console.log(sampleUser);
    process.exit(0);
}

generateSampleData();
