import BaseError from '../../../global/errors/baseError';
import ErrorCode from './errorCode';

export default class UserNotFoundError extends BaseError {
  constructor(message?: string) {
    super(message || '未找到该用户');
    this.name = 'USER_NOTFOUND_ERROR';
    this.code = ErrorCode.USER_NOTFOUND_ERROR;
  }
}
