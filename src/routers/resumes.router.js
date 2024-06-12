import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { ResumeRepository } from '../repositories/resumes.repository.js';
import { ResumeService } from '../services/resumes.service.js';
import { ResumeController } from '../controllers/resumes.controller.js';

const resumesRouter = express.Router();

const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

// resumesRouter.post('/', createResumeValidator, createResume());   //이력서 생성
// resumesRouter.get('/', resumeList());   //이력서 목록 조희
// resumesRouter.get('/:id', resumeDetail());    //이력서 상세 조회
// resumesRouter.put('/:id', updateResumeValidator, updateResume());   //이력서 수정
// resumesRouter.delete('/:id', deleteResume());   //이력서 삭제

export { resumesRouter };
