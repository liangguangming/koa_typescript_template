import BaseError from '../../../global/errors/baseError';
import ErrorCode from './errorCode';

export default class CreateUserError extends BaseError {
  constructor(message?: string) {
    super(message || 'USER_CREATE_ERROR');
    this.name = 'USER_CREATE_ERROR';
    this.code = ErrorCode.USER_CREATE_ERROR;
  }
}
