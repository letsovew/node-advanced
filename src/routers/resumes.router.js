import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import { 
        createResume, 
        resumeList,
        resumeDetail,
        updateResume,
        deleteResume,
      } from '../controllers/resumes.controller.js';

const resumesRouter = express.Router();

resumesRouter.post('/', createResumeValidator, createResume()); //이력서 생성
resumesRouter.get('/', resumeList()); //이력서 목록 조희
resumesRouter.get('/:id', resumeDetail());  //이력서 상세 조회
resumesRouter.put('/:id', updateResumeValidator, updateResume()); //이력서 수정
resumesRouter.delete('/:id', deleteResume()); //이력서 삭제

export { resumesRouter };
