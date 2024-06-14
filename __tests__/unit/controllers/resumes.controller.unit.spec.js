import { jest } from '@jest/globals';
import { ResumeController } from '../../../src/controllers/resumes.controller';

const mockResumeService = {
    getAllResume: jest.fn(),
    findResumeById: jest.fn(),
    createResume: jest.fn(),
    updateResume: jest.fn(),
    deleteResume: jest.fn(),
};

const mockRequest = {
    user: jest.fn(),
    body: jest.fn(),
    query: jest.fn(),
    params: jest.fn(),
};

const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
};

const mockNext = jest.fn();

const resumeController = new ResumeController(mockResumeService);

describe('Resume Controller Unit Test', () => {
    
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status.mockReturnValue(mockResponse);
    });
    //이력서 조회 성공
    test('getAllResume Method By Success', async () => {
        const sampleResumes = [
            {
                id: 1,
                authorId: 2,
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

        const getResumesRequestQueryParams = {
            authorId: 2,
            sort: 'desc',
        };

        mockRequest.query = getResumesRequestQueryParams;

        mockResumeService.getAllResume.mockReturnValue(sampleResumes);

        await resumeController.getResumes(mockRequest, mockResponse, mockNext);

        expect(mockResumeService.getAllResume).toHaveBeenCalledWith(
            getResumesRequestQueryParams.authorId,
            getResumesRequestQueryParams.sort,
        );
        expect(mockResumeService.getResumes).toHaveBeenCalledTimes(1);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            data: sampleResumes,
        });
    });
    //이력서 조회 실패
    test('getAllResume Method By Invalid Params Error', async () => {
        mockRequest.params = {
            authorId: 'AuthorId_InvalidParamsError',
            sort: 'Sort_InvalidParamsError',
        };

        await resumeController.getAllResume(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
    });
    //이력서 상세 조회 성공
    test('findResumeById Method By Success', async () => {
        const findResumeByIdQueryParams = {
            id: 'ResumeId_Success',
            authorId: 'authorId_Success',
        };

        mockRequest.params = findResumeByIdQueryParams;

        const findResumeByIdReturnValue = {
            id: 1,
            authorId: 1,
            title: 'Title_1',
            content: 'Content_1',
            status: 'APPLY',
            createdAt: new Date('06 October 2024 15:50 UTC'),
            updatedAt: new Date('06 October 2024 15:50 UTC'),
        };

        mockResumeService.findResumeById.mockReturnValue(findResumeByIdReturnValue);

        await resumeController.findResumeById(mockRequest, mockResponse, mockNext);

        expect(mockResumeService.findResumeById).toHaveBeenCalledWith(
            findResumeByIdQueryParams.id,
            findResumeByIdQueryParams.authorId,
            findResumeByIdQueryParams.title,
            findResumeByIdQueryParams.content,
            findResumeByIdQueryParams.status,
            findResumeByIdQueryParams.createdAt,
            findResumeByIdQueryParams.updatedAt,
        );
        expect(mockResumeService.findResumeById).toHaveBeenCalledTimes(1);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            data: findResumeByIdReturnValue,
        });
    });

    //이력서 상세 조회 실패
    test('findResumeById Method By Invalid Params Error', async () => {
        mockRequest.params = {
            id: 'ResumeId_InvalidParamsError',
            authorId: 'AuthorId_InvalidParamsError',
        };

        await resumeController.findResumeById(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
    });

    //이력서 생성 성공
    test('createResume Method By Success', async () => {
        const createResumeRequestBodyParams = {
            title: 'Title_Success',
            content: 'Content_Success',
        };

        mockRequest.body = createResumeRequestBodyParams;

        const createResumeReturnValue = {
            authorId: 90,
            ...createResumeRequestBodyParams,
            title: 'New_Title',
            content: 'New_Content',
        };

        mockResumeService.createResume.mockReturnValue(createResumeReturnValue);

        await resumeController.createResume(mockRequest, mockResponse, mockNext);

        expect(mockResumeService.createResume).toHaveBeenCalledWith(
            createResumeRequestBodyParams.authorId,
            createResumeRequestBodyParams.title,
            createResumeRequestBodyParams.content,
        );
        expect(mockResumeService.createResume).toHaveBeenCalledTimes(1);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);

        expect(mockResponse.json).toHaveBeenCalledWith({
            data: createResumeReturnValue,
        });
    });
    //이력서 생성 실패
    test('createResume Method By Invalid Params Error', async () => {
        mockRequest.body = {
            title: 'Title_InvalidParamsError',
            content: 'Content_InvalidParamsError',
        };

        await resumeController.createResume(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
    });

    //이력서 수정 성공
    test('updateResume Method By Success', async () => {
        const updateResumeParams = {
            id: 1,
            authorId: 1,
            title: 'Update_Title',
            content: 'Update_Content',
        };

        mockRequest.params = updateResumeParams;

        const updateResumeReturnValue = {
            ...updateResumeParams,
            updatedAt: new Date().toString(),
        };

        mockResumeService.updateResume.mockReturnValue(updateResumeReturnValue);

        await resumeController.updateResume(mockRequest, mockResponse, mockNext);

        expect(mockResumeService.updateResume).toHaveBeenCalledWith(
            updateResumeParams.id,
            updateResumeParams.authorId,
            updateResumeParams.title,
            updateResumeParams.content,
        );

        expect(mockResumeService.updateResume).toHaveBeenCalledTimes(1);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            data: updateResumeReturnValue,
        });
    });

    //이력서 수정 실패
    test('updateResume Method By Invalid Params Error', async () => {
        mockRequest.body = {
            title: 'Title_InvalidParamsError',
            content: 'Content_InvalidParamsError',
        };

        await resumeController.updateResume(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
    });

    //이력서 삭제 성공
    test('deleteResume Method By Invalid Params Error', async () => {
        const deleteResumeRequestQueryParams = {
            id: 'ResumeId_Success',
            authorId: 'AuthorId_Success',
        };

        mockRequest.query = deleteResumeRequestQueryParams;

        const deleteResumeReturnValue = {
            ...deleteResumeRequestQueryParams,
        };

        mockResumeService.deleteResume.mockReturnValue(deleteResumeReturnValue);

        await resumeController.deleteResume(mockRequest, mockResponse, mockNext);

        expect(mockResumeService.deleteResume).toHaveBeenCalledWith(
            deleteResumeRequestQueryParams.id,
            deleteResumeRequestQueryParams.authorId,
        );
        expect(mockResumeService.deleteResume).toHaveBeenCalledTimes(1);

        expect(mockResumeService.status).toHaveBeenCalledTimes(1);
        expect(mockResumeService.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            data: deleteResumeReturnValue,
        });
    });

    //이력서 삭제 실패
    test('deleteResume Method By Invalid Params Error', async () => {
        mockRequest.params = {
            id: 'ResumeId_InvalidParamsError',
            authorId: 'AuthorId_InvalidParamsError',
        };

        await resumeController.deleteResume(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
    });
});
