import ERROR_CODE from './errorCode';
import BaseError from './baseError';

class DataValidateError extends BaseError {
  public errorDetail: any[];

  constructor(message: string, errorDetail: any) {
    super(`数据校验错误, ${message}`);
    this.name = 'DATA_VALIDATE_ERROR';
    this.code = ERROR_CODE.SERVER_ERROR;
    this.errorDetail = errorDetail;
  }
}

export default DataValidateError;
