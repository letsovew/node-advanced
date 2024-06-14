import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class BadRequest {
    constructor(MESSAGES = BadRequest.name) {
        this.message = MESSAGES;
        this.status = HTTP_STATUS.BAD_REQUEST;
    }
}

class Unauthorized {
    constructor(MESSAGES = Unauthorized.name) {
        this.message = MESSAGES;
        this.status = HTTP_STATUS.UNAUTHORIZED;
    }
}

class Forbidden {
    constructor(MESSAGES = Forbidden.name) {
        this.message = MESSAGES;
        this.status = HTTP_STATUS.FORBIDDEN;
    }
}

class NotFound {
    constructor(MESSAGES = NotFound.name) {
        this.message = MESSAGES;
        this.status = HTTP_STATUS.NOT_FOUND;
    }
}

class Conflict {
    constructor(MESSAGES = Conflict.name) {
        this.message = MESSAGES;
        this.status = HTTP_STATUS.CONFLICT;
    }
}

class InternalServerError {
    constructor(MESSAGES = InternalServerError.name) {
        this.message = MESSAGES;
        this.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    }
}

export const HttpError = {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    Conflict,
    InternalServerError,
};
