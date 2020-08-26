import * as Ajv from 'ajv';
import DataValidateError from '../global/errors/dataValidateError';

const jsonValidator = new Ajv({ allErrors: true });

class Validator {
  /**
   * 校验数据
   * @param {Object} jsonSchema schema
   * @param {Object} jsonData 校验数据
   */
  static validateBySchema(jsonSchema: boolean | object, jsonData: any) {
    const validate = jsonValidator.compile(jsonSchema);
    if (!validate(jsonData)) {
      let message = '';
      validate.errors.forEach((err) => {
        message += `${err.propertyName}, ${err.message} `;
      });
      throw new DataValidateError(message, validate.errors);
    }
  }
}

export default Validator;
