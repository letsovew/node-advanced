import { jest } from '@jest/globals';
import { ResumeRepository } from '../../../src/repositories/resumes.repository';

let mockPrisma = {
    resumes: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

let resumeRepository = new ResumeRepository(mockPrisma);

describe('Resume Repository Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('getAllResume Method', async () => {
        const mockReturn = 'findMany String';
        mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

        const resumes = await resumeRepository.getAllResume();

        expect(resumeRepository.prisma.resumes.findMany).toHaveBeenCalledTimes(1);

        expect(resumes).toBe(mockReturn);
    });

    test('createResume Method', async () => {
        const mockReturn = 'create Return String';
        mockPrisma.resumes.create.mockReturnValue(mockReturn);

        const createResumeParams = {
            authorId: 'createResumeAuthorId',
            title: 'createResumeTitle',
            content: 'createResumeContent',
        };

        const createResumeData = await resumeRepository.createResume(
            createResumeParams.authorId,
            createResumeParams.title,
            createResumeParams.content,
        );

        expect(createResumeData).toBe(mockReturn);

        expect(mockPrisma.resumes.create).toHaveBeenCalledTimes(1);

        expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
            data: createResumeData,
        });
    });

    // test('findResumeById Method', async () => {

    // });

    // test('updateResume Method', async () => {

    // });

    // test('deleteResume Method', async () => {

    // });
});
