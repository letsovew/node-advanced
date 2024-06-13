import { jest } from '@jest/globals';
import { ResumeService } from '../../../src/services/resumes.service';

let mockResumeRepository = {
    getAllResume: jest.fn(),
    createResume: jest.fn(),
    findResumeById: jest.fn(),
    updateResume: jest.fn(),
    deleteResume: jest.fn(),
};

let resumeService = new ResumeService(mockResumeRepository);

describe('Resume Service Unit Test', () => {
    
    beforeEach(()=> {
        jest.resetAllMocks();
    });
    //�̷¼� ��ȸ ����
    test('getAllResume Method By Success', async () => {
        const sampleResumes = [
            {
                id: 1,
                authorId: 1,
                title: 'Title_1',
                content: 'Content_1',
                status: 'APPLY',
                createdAt: new Date('06 October 2024 15:50 UTC'),
                updatedAt: new Date('06 October 2024 15:50 UTC'),
            },
            {   
                id: 2,
                authorId: 2,
                title: 'Title_2',
                content: 'Content_2',
                status: 'APPLY',
                createdAt: new Date('07 October 2024 15:50 UTC'),
                updatedAt: new Date('07 October 2024 15:50 UTC'),
            },
        ];

        const getResumes

        mockResumeRepository.getAllResume.mockReturnValue(sampleResumes);

        const allResume = await resumeService.getAllResume(authorId, sort);

        expect(allResume).toEqual({
            sampleResumes.map(r => {
                return r;
            });
        }),

        expect(mockResumeRepository.getAllResume).toHaveBeenCalledTimes(1);
    });

    //�̷¼� ��ȸ ����
    test('getAllResume Method By Not Found Resume Error', async () => {
        const sampleResumes = null;
        mockResumeRepository.getAllResume.mockReturnValue(sampleResumes);
        try{
            await resumeService.getAllResume(7777,'desc');
        }catch(err){
            expect(mockResumeRepository.getAllResume).toHaveBeenCalledTimes(1);
            expect(mockResumeRepository.getAllResume).toHaveBeenCalledWith(7777, 'desc');
            expect(error.message).toEqual('�������� �ʴ� �̷¼��Դϴ�.');
        }
    });

    //�̷¼� ���� ����
    test('createResume Method By Success', async () => {
        const sampleResume = {
            id: 1,
            authorId: 1,
            title: 'Title_1',
            content: 'Content_1',
            status: 'APPLY',
            createdAt: new Date('06 October 2024 15:50 UTC'),
            updatedAt: new Date('06 October 2024 15:50 UTC'),
        };

        mockResumeRepository.createResume.mockReturnValue(sampleResume);

        const createResume = await resumeService.createResume(1, 'Title_1', 'Content_1');

        expect(mockResumeRepository.createResume).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.createResume).toHaveBeenCalledWith(
            sampleResume.authorId,
            sampleResume.title,
            sampleResume.content,
        );

        expect(createResume).toEqual({
            id: sampleResume.id,
            authorId: sampleResume.authorId,
            title: sampleResume.title,
            content: sampleResume.content,
            status: sampleResume.status,
            createdAt: sampleResume.createdAt,
            updatedAt: sampleResume.updatedAt,
        });
    });

    //�̷¼� ���� ����
    test('createResume Method By Error', async () => {
        const sampleResume = {
            id: 1,
            authorId: 1,
            title: 'Title_1',
            content: null,
            status: 'APPLY',
            createdAt: new Date('06 October 2024 15:50 UTC'),
            updatedAt: new Date('06 October 2024 15:50 UTC'),
        };

        mockResumeRepository.createResume.mockReturnValue(sampleResume);
    });

    //�̷¼� ���� ����
    test('deleteResume Method By Success', async () => {
        const sampleResume = {
            id:1,
            authorId: 1,
            title: 'Title_1',
            content: 'Content_1',
        };

        const deleteResume = await resumeService.deleteResume(1, 1);

        expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.deleteResume).toHaveBeenCalledWith({
            sampleResume.id,
            sampleResume.authorId,
        });

        expect(deleteResume).toEqual({
            id: sampleResume.id,
        });
    });
    //�̷¼� ���� ����
    test('deleteResume Method By Not Found Resume Error', async () => {
        
        const sampleResume = null;

        try{
            await resumeService.deleteResume(7777,8888);
        }catch(error){
            expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(1);
            expect(mockResumeRepository.deleteResume).toHaveBeenCalledWith(7777,8888);

            expect(error.message).toEqual('�������� �ʴ� �̷¼��Դϴ�.');
        }
    });
});
