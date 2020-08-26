import BaseError from './baseError';
import ErrorCode from './errorCode';

export default class ServerError extends BaseError {
  constructor() {
    super('服务器错误');
    this.name = 'SERVER_ERROR';
    this.code = ErrorCode.SERVER_ERROR;
  }
}
