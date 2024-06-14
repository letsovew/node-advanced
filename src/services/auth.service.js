import { AuthRepository } from "../repositories/auth.repository";
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SERVER_PORT, 
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN
} from '../constants/env.constant.js';

export class AuthService {
    authRepository = new AuthRepository();

    existedUser = async ( email ) => {
        const user = await this.authRepository.existedUser(email);
        return user;
    };

    signUp = async (email, password, name) => {
        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
        const newUser = await this.authRepository.signUp(email, hashedPassword, name);
        newUser.data.password = undefined;
        
        return newUser;
    };

    signIn = async (email, password) => {
        const user = await this.authRepository.signIn(email, password);
        const isPasswordMatched = user && bcrypt.compareSync(password, user.password);
        if (!isPasswordMatched) return isPasswordMatched;
        const payload = { id: user.id };
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });

        return accessToken;
    };
}