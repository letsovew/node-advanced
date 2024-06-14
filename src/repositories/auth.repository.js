import { prisma } from '../utils/prisma.util.js';

export class AuthRepository {

    existedUser = async (email) => {
        const user = await prisma.user.findUnique({ where: { email } });

        return user;
    };

    signUp = async (email, hashedPassword, name) => {
        const data = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return data;
    };

    signIn = async (email, password) => {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    };
};