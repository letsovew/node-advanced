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
    //이력서 조회 성공
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
                authorId: 1,
                title: 'Title_2',
                content: 'Content_2',
                status: 'APPLY',
                createdAt: new Date('07 October 2024 15:50 UTC'),
                updatedAt: new Date('07 October 2024 15:50 UTC'),
            },
        ];

        mockResumeRepository.getAllResume.mockReturnValue(sampleResumes);

        const allResume = await resumeService.getAllResume(authorId, sort);

        expect(allResume).toEqual({
            sampleResumes.map(resume => {
                return resume;
            });
        }),

        expect(mockResumeRepository.getAllResume).toHaveBeenCalledTimes(1);
    });

    //이력서 조회 실패
    test('getAllResume Method By Not Found Resume Error', async () => {
        const sampleResumes = null;
        mockResumeRepository.getAllResume.mockReturnValue(sampleResumes);
        try{
            await resumeService.getAllResume(7777,'desc');
        }catch(err){
            expect(mockResumeRepository.getAllResume).toHaveBeenCalledTimes(1);
            expect(mockResumeRepository.getAllResume).toHaveBeenCalledWith(7777, 'desc');
            expect(error.message).toEqual('존재하지 않는 이력서입니다.');
        }
    });

    //이력서 상세 조회 성공
    test('findResumeById Method By Success', async () => {
        const sampleResume = 
            {   
                id: 2,
                authorId: 2,
                title: 'Title_2',
                content: 'Content_2',
                status: 'APPLY',
                createdAt: new Date('07 October 2024 15:50 UTC'),
                updatedAt: new Date('07 October 2024 15:50 UTC'),
            };

        mockResumeRepository.findResumeById.mockReturnValue(sampleResume);

        const findResume = await resumeService.findResumeById(2, 2);

        expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(
            id: sampleResume.id,
            authorId: sampleResume.authorId,
        );

        expect(findResumeById).toEqual({
            id: sampleResume.id,
            authorId: sampleResume.authorId,
            title: sampleResume.title,
            content: sampleResume.content,
            status: sampleResume.status,
            createdAt: sampleResume.createdAt,
            updatedAt: sampleResume.updatedAt,
        });
    });

    //이력서 상세 조회 실패
    test('findResumeById Method By Not Found Resume Error', async () => {
        const sampleResume = null;

        mockResumeRepository.findResumeById.mockReturnValue(sampleResume);

        try{
            await resumeService.findResumeById(1212,2323);
        }catch(error){
            expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1);
            expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(1212,2323);

            expect(error.message).toEqual('존재하지 않는 게시글입니다.');
        }
    });

    //이력서 생성 성공
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

    //이력서 생성 실패
    test('createResume Method By Error', async () => {
        try{
            await resumeService.createResume(77, null, null);
        }catch(error){
            expect(error.message).toEqual('이력서 생성 실패');
        }
    });

    //이력서 수정 성공
    test('updateResume Method By Success', async () => {
        const sampleResume = {
            id: 1,
            authorId: 1,
            title: 'Title_1',
            content: 'Content_1',
            status: 'APPLY',
            createdAt: new Date('06 October 2024 15:50 UTC'),
            updatedAt: new Date('06 October 2024 15:50 UTC'),
        };

        mockResumeRepository.updateResume.mockReturnValue(sampleResume);

        const updateResume = await resumeService.updateResume(1, 1, 'UPDATE_TITLE', 'UPDATE_CONTENT');

        expect(mockResumeRepository.updateResume).toHaveBeenCalledTimes(1);
        expect(mockResumeRepository.updateResume).toHaveBeenCalledWith(
            sampleResume.id,
            sampleResume.authorId,
        );

        expect(updateResume).toEqual({
            id: sampleResume.id,
            authorId: sampleResume.authorId,
            title: 'UPDATE_TITLE',
            content: 'UPDATE_CONTENT',
            status:sampleResume.status,
            createdAt: sampleResume.createdAt,
            updatedAt: sampleResume.updatedAt,
        })
    });
    //이력서 삭제 성공
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
    //이력서 삭제 실패
    test('deleteResume Method By Not Found Resume Error', async () => {
        
        const sampleResume = null;

        try{
            await resumeService.deleteResume(7777,8888);
        }catch(error){
            expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(1);
            expect(mockResumeRepository.deleteResume).toHaveBeenCalledWith(7777,8888);

            expect(error.message).toEqual('존재하지 않는 이력서입니다.');
        }
    });
});
