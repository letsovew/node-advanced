import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
    authService = new this.AuthService();

    signUp = async (req, res, next) => {
        try {
            const { email, password, name } = req.body;

            const existedUser = await this.resumeService.existedUser(email);
            // 이메일이 중복된 경우
            if (existedUser) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    status: HTTP_STATUS.CONFLICT,
                    message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
                });
            };

            const newUser = await this.resumeService.signUp(email, password, name);
            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
                data: {newUser},
            });
        } catch (error) {
            next(error);
        }
    };

    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const accessToken = await this.authService.signIn(email, password);
        
            if (!accessToken) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    status: HTTP_STATUS.UNAUTHORIZED,
                    message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
                });
            };

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
                data: { accessToken },
            });
        } catch (error) {
            next(error);
        }
    };
};
