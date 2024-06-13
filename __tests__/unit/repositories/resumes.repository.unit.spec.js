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

        const getAllResumeParams = {
            authorId: 'getAllResumeAuthorId',
            sort: 'getAllResumeSort',
        };

        const getAllResumeData = await resumeRepository.getAllResume(
            getAllResumeParams.authorId,
            getAllResumeParams.sort,
        );

        expect(getAllResumeData).toBe(mockReturn);
        expect(resumeRepository.prisma.resumes.findMany).toHaveBeenCalledTimes(1);
        expect(resumeRepository.prisma.resumes.findMany).toHaveBeenCalledWith({
            data: getAllResumeParams,
        });
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
            data: createResumeParams,
        });
    });

    test('findResumeById Method', async () => {
        const mockReturn = 'findUnique Return String';
        mockPrisma.resumes.findUnique.mockReturnValue(mockReturn);

        const findResumeByIdParams = {
            id: 'findResumeByIdResumeId',
            authorId: 'findResumeByIdAuthorId',
        };

        const findResumeByIdData = await resumeRepository.findResumeById(
            findResumeByIdParams.id,
            findResumeByIdParams.authorId,
        );

        expect(findResumeByIdData).toBe(mockReturn);
        expect(mockPrisma.resumes.findUnique).toHaveBeenCalledTimes(1);
        expect(mockPrisma.resumes.findUnique).toHaveBeenCalledWith({
            data: findResumeByIdParams,
        });
    });

    test('updateResume Method', async () => {
        const mockReturn = 'update Return String';
        mockPrisma.resumes.update.mockReturnValue(mockReturn);

        const updateResumeParams = {
            authorId: 'updateResumeAuthorId',
            id: 'updateResumeId',
            title: 'updateResumeTitle',
            content: 'updateResumeContent',
        };

        const updateResumeData = await resumeRepository.updateResume(
            updateResumeParams.title,
            updateResumeParams.content,
        );

        expect(updateResumeData).toBe(mockReturn);
        expect(mockPrisma.resumes.update).toHaveBeenCalledTimes(1);
        expect(mockPrisma.resumes.update).toHaveBeenCalledWith({
            data: updateResumeParams,
        });
    });

    test('deleteResume Method', async () => {
        const mockReturn = 'delete Return String';
        mockPrisma.resumes.delete.mockReturnValue(mockReturn);

        const deleteResumeParams = {
            id: 'deleteResumeId',
            authorId: 'deleteResumeAuthorId',
        };

        const deleteResumeData = await resumeRepository.deleteResume(
            deleteResumeParams.id,
            deleteResumeParams.authorId,
        );

        expect(deleteResumeData).toBe(mockReturn);
        expect(mockPrisma.resumes.delete).toHaveBeenCalledTimes(1);
        expect(mockPrisma.resumes.delete).toHaveBeenCalledWith({
            data: deleteResumeParams,
        });
    });
});
