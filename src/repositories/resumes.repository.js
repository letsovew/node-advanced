import prisma from '../utils/prisma.util.js';

export class ResumeRepository {

    getAllResume = async (authorId, sort) => {
    
        let data = await prisma.resume.findMany({
            where: { authorId },
            orderBy: {
                createdAt: sort,
            },
            include: {
                author: true,
            },
        });

        return data;
    };

    createResume = async (authorId, title, content) => {
        const createResume = await prisma.resumes.create({
            data: {
                authorId,
                title,
                content,
            },
        });
        return createResume;
    };

    findResumeById = async (authorId, id) => {
        let data = await prisma.resume.findUnique({
            where: { id: +id, authorId },
            include: { author: true },
        });

        return data;
    };

    updateResume = async (authorId, id, title, content) => {
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
        if(!existedResume) return false;

        const updateData = await prisma.resume.update({
            where: { id: +id, authorId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
        });
        return updateData;
    };

    deleteResume = async (authorId, id) => {
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
        if(!existedResume) return false;

        const resume = await prisma.resume.delete({ where: { id: +id, authorId } });

        return resume;
    };
};