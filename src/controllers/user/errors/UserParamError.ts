import BaseError from '../../../global/errors/baseError';
import ErrorCode from './errorCode';

export default class UserParamError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'USER_PARAM_ERROR';
    this.code = ErrorCode.USER_PARAM_ERROR;
  }
}
