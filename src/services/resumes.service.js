import prisma from '../utils/prisma.util.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ResumeRepository } from '../repositories/resumes.repository.js';


export class ResumeService {
    resumeRepository = new ResumeRepository();

    getAllResume = async (authorId, sort) => {
        const allResume = await this.ResumeRepository.getAllResume(authorId, sort);

        return allResume.map( resume => {
            return{
                id: +resume.id,
                authorId: +resume.authorId,
                title: resume.title,
                content: resume.content,
                status: resume.status,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            }
        });
    };

    createResume = async(authorId, title, content) => {
        const resumeData = await this.ResumeRepository.createResume(authorId, title, content);

        return {
            id: +resumeData.id,
            authorId: +resumeData.authorId,
            title: resumeData.title,
            content: resumeData.content,
            status: resumeData.status,
            createdAt: resumeData.createdAt,
            updatedAt: resumeData.updatedAt,
        };
    };

    findResumeById = async (authorId, id) => {

        const resume = await this.resumeRepository.findResumeById(authorId,id);

        return {
            id: resume.id,
            authorId: resume.authorId,
            authorName: resume.author.name,
            title: resume.title,
            content: resume.content,
            status: resume.status,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        };
    };

    updateResume = async (authorId, id, title, content) => {
        const resume = await this.resumeRepository.updateResume(authorId, id, title, content);
        if(!resume) return false;
        return resume;
    };

    deleteResume = async (authorId, id) => {
        const resume = await this.resumeRepository.deleteResume(authorId, id);
        if(!resume) return false;
        return resume;
    };
}