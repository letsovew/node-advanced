import prisma from '../utils/prisma.util.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { MIN_RESUME_LENGTH } from '../constants/resume.constant.js';
import { ResumeService } from '../services/resumes.service.js';

export class ResumeController {

    resumeService = new ResumeService();

    //이력서 조회
    getResumes = async(req, res, next) => {
        const user = req.user;
        const authorId = user.id;
        let { sort } = req.query;

        try {
            sort = sort?.toLowerCase();
            if (sort !== 'desc' && sort !== 'asc') sort = 'desc';
            
            req.getData = { authorId, sort };
            const resumes = await this.resumeService.getAllResume(authorId, sort);

            res.status(HTTP_STATUS.OK).json({ data: resumes });
            next();
        }catch(err){
            next(err);
        }
    };
    
    // 이력서 상세 조회
    getResumeDetailById = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;
            const { id } = req.params;

            const resume = await this.resumeService.findResumeById(authorId, id);

            if (!resume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }
        
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
                data: resume,
            });
        } catch (error) {
            next(error);
        }
    };
        
    //이력서 생성
    createResume = async(req, res, next) => {
        try{
            const { user } = req.user;
            const { title, content } = req.body;
            const { authorId } = user.id;

            const createResumeData = await this.ResumeService.createResume(authorId, title, content);

            res.status(HTTP_STATUS.OK).json({ data: createResumeData });
        }catch(err){
            next(err);
        }
    };
};

// 이력서 수정
export const updateResume = async(req, res, next) => {
    try {
        const user = req.user;
        const authorId = user.id;
    
        const { id } = req.params;
    
        const { title, content } = req.body;
    
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
    
        if (!existedResume) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
            });
        }
    
        const data = await prisma.resume.update({
            where: { id: +id, authorId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
        });
    
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.RESUMES.UPDATE.SUCCEED,
            data,
        });
    } catch (error) {
        next(error);
    }
};

// 이력서 삭제
export const deleteResume = async(req, res, next) => {
    try {
        const user = req.user;
        const authorId = user.id;
    
        const { id } = req.params;
    
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
    
        if (!existedResume) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
            });
        }
    
        const data = await prisma.resume.delete({ where: { id: +id, authorId } });
    
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.RESUMES.DELETE.SUCCEED,
            data: { id: data.id },
        });
    } catch (error) {
        next(error);
    }
};