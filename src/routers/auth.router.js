import express from 'express';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { signUp, signIn } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUpValidator, signUp());
authRouter.post('/sign-in', signInValidator, signIn());

export { authRouter };
