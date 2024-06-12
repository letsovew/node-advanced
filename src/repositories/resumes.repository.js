export class ResumeRepository {
    constructor(prisma){
        this.prisma = prisma;
    }
    getAllResume = async (authorId, sort) => {
    
        let data = await this.prisma.resume.findMany({
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
        const createResume = await this.prisma.resumes.create({
            data: {
                authorId,
                title,
                content,
            },
        });
        return createResume;
    };

    findResumeById = async (authorId, id) => {
        let data = await this.prisma.resume.findUnique({
            where: { id: +id, authorId },
            include: { author: true },
        });

        return data;
    };

    updateResume = async (authorId, id, title, content) => {
        let existedResume = await this.prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
        if(!existedResume) return false;

        const updateData = await this.prisma.resume.update({
            where: { id: +id, authorId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
            },
        });
        return updateData;
    };

    deleteResume = async (authorId, id) => {
        let existedResume = await this.prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
        if(!existedResume) return false;

        const resume = await this.prisma.resume.delete({ where: { id: +id, authorId } });

        return resume;
    };
};