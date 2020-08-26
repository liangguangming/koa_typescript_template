import BaseError from './errors/baseError';

export default class Result<T> {
  public error : {
    name: string,
    code: number,
    message: string
  };

  constructor(error: BaseError, public message: string = '', public data?: T) {
    if (error) {
      this.error = error.toJSON();
    }
    this.message = message;
    this.data = data;
  }
}
