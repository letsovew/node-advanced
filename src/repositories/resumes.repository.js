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
};