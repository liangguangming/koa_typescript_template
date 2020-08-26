import * as mongoose from 'mongoose';

export default class Util {
  /**
   * 验证 MONGOID
   * @param {string} id ObjectId
   */
  static validMongoId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
