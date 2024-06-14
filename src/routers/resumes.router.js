import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { ResumeController } from '../controllers/resumes.controller.js';

const resumeRouter = express.Router();

const resumeController = new ResumeController();

resumeRouter.post('/', createResumeValidator, resumeController.createResume);   //이력서 생성
resumeRouter.get('/', resumeController.getAllResume);   //이력서 목록 조희
resumeRouter.get('/:id', resumeController.findResumeById);    //이력서 상세 조회
resumeRouter.put('/:id', updateResumeValidator, resumeController.updateResume);   //이력서 수정
resumeRouter.delete('/:id', resumeController.deleteResume);   //이력서 삭제

export {resumeRouter};
