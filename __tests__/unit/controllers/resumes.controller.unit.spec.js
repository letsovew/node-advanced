import { jest } from '@jest/globals';
import { ResumeController } from '../../../src/controllers/resumes.controller';

const mockResumeService = {
    getResumes: jest.fn(),
    getResumeDetailById: jest.fn(),
    createResume: jest.fn(),
    updateResume: jest.fn(),
    deleteResume: jest.fn(),
};

const mockRequest = {
    body: jest.fn();
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

    test('getResumes Method By Success', async () => {
        const sampleResumes = [
            {
                id: 1,
                authorId: 1,
                title: 'Title_1',
                content: 'Content_1',
            },
            {
                id: 2,
                authorId: 2,
                title: 'Title_2',
                content: 'Content_2',
            },
        ];

        mockResumeService.getResumes.mockReturnValue(sampleResumes);

        await resumeController.getResumes(mockRequest, mockResponse, mockNext);

        expect(mockResumeService.getResumes).toHaveBeenCalledTimes(1);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            data: sampleResumes,
        });
    });

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

    test('createResume Method By Invalid Params Error', async () => {
        mockRequest.body = {
            title: 'Title_InvalidParamsError',
            content: 'Content_InvalidParamsError',
        };

        await resumeController.createResume(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledWith(new Error('InvalidParamsError'));
    });
});
