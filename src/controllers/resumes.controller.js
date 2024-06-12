import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ResumeService } from '../services/resumes.service.js';

export class ResumeController {

    resumeService = new ResumeService();

    //이력서 조회
    getResumes = async(req, res, next) => {
        const user = req.user;
        const authorId = user.id;
        let { sort } = req.query;

        try {
            sort = sort?.toLowerCase();
            if (sort !== 'desc' && sort !== 'asc') sort = 'desc';
            
            req.getData = { authorId, sort };
            const resumes = await this.resumeService.getAllResume(authorId, sort);

            res.status(HTTP_STATUS.OK).json({ data: resumes });
            next();
        }catch(err){
            next(err);
        }
    };
    
    // 이력서 상세 조회
    getResumeDetailById = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;
            const { id } = req.params;

            const resume = await this.resumeService.findResumeById(authorId, id);
            if (!resume) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: HTTP_STATUS.NOT_FOUND,
                    message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
                });
            }
        
            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
                data: resume,
            });
        } catch (error) {
            next(error);
        }
    };
        
    //이력서 생성
    createResume = async(req, res, next) => {
        try{
            const { user } = req.user;
            const { title, content } = req.body;
            const { authorId } = user.id;

            const createResumeData = await this.resumeService.createResume(authorId, title, content);

            res.status(HTTP_STATUS.OK).json({ data: createResumeData });
        }catch(err){
            next(err);
        }
    };

    //이력서 수정
    updateResume = async(req, res, next) => {
        const user = req.user;
        const authorId = user.id;
        const { id } = req.params;
        const { title, content } = req.body;

        const resume = await this.resumeService.updateResume(authorId, id, title, content);

        if (!resume) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.RESUMES.UPDATE.SUCCEED,
            data: resume,
        });
    };

    //이력서 삭제
    deleteResume = async (req, res, next) => {
        const user = req.user;
        const authorId = user.id;
        const { id } = req.params;

        const resume = await this.resumeService.deleteResume(authorId, id);
        if(!resume){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
            });
        };

        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.RESUMES.DELETE.SUCCEED,
            data: { id: resume.id },
        });
    };
};
