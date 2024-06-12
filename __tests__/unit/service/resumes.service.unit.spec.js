import { jest } from '@jest/globals';
import { ResumeService } from '../../../src/services/resumes.service';

let mockResumeRepository = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

let resumeService = new ResumeService(mockResumeRepository);

describe('Resume Service Unit Test', () => {
    
    beforeEach(()=> {
        jest.resetAllMocks();
    });

    test('getAllResume Method', async () => {
        const sampleResume = [
            {
                authorId: 1,
                title: 'Title_1',
                content: 'Content_1',
            },
            {
                authorId: 2,
                title: 'Title_2',
                content: 'Content_2',
            },
        ];

        mockResumeRepository.getAllResume.mockReturnValue(sampleResume);

        const allResume = await resumeService.getAllResume();

        expect(allResume).toEqual(
            sampleResume.sort((a, b) => {
                return b.authorId - a.authorId;
            }),
        );

        expect(mockResumeRepository.getAllResume).toHaveBeenCalledTimes(1);
    });

    test('deleteResume Method By Success', async () => {
        const sampleResume = {
            id:1,
            authorId: 1,
            title: 'Title_1',
            content: 'Content_1',
        };

        mockResumeRepository.findResumeById.mockReturnValue(sampleResume);

        const deleteResume = await resumeService.deleteResume(1);

        expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(
            sampleResume.authorId,
        );

        expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.deleteResume).toHaveBeenCalledWith(sampleResume.authorId);

        expect(deleteResume).toEqual({
            id: sampleResume.id,
            authorId: sampleResume.authorId,
            title: sampleResume.title,
            content: sampleResume.title,
        });
    });

    test('deleteResume Method By Not Found Resume Error', async () => {
        
        const sampleResume = null;

        mockResumeRepository.findResumeById.mockReturnValue(sampleResume);

        try{
            await resumeService.deleteResume(7777,8888);
        }catch(error){
            expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1);
            expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(7777);

            expect(error.message).toEqual('존재하지 않는 이력서입니다.');
        }
    });
});
