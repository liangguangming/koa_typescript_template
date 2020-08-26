import IUserRepository from '../../models/user/IUserRepository';
import Result from '../../global/result';
import UserParamError from './errors/UserParamError';
import BaseError from '../../global/errors/baseError';
import UserNotFoundError from './errors/userNotFoundError';
import ServerError from '../../global/errors/serverError';
import Validator from '../../libs/validator';
import CreateUserError from './errors/CreateUserError';
import Logger from '../../libs/logger';
import CreateUserDTO from './dto/createUserDTO';
import UserDTO from './dto/userDTO';
import Util from '../../libs/Util';

const userLogger = new Logger('user');

export default class UserController {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string): Promise<Result<UserDTO>> {
    let result: Result<UserDTO>;
    try {
      if (!id) {
        throw new UserParamError('缺少用户ID');
      }
      if (!Util.validMongoId(id)) {
        throw new UserParamError('用户ID不对');
      }
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new UserNotFoundError();
      }
      result = new Result(null, `获取到${id}用户的信息`, user);
    } catch (error) {
      if (error instanceof BaseError) {
        result = new Result(error, `获取用户 ${id} 信息失败`);
      } else {
        userLogger.error('%o', error);
        result = new Result(new ServerError(), '获取用户失败');
      }
    }

    return result;
  }

  async createUser(userProps : CreateUserDTO) {
    let user: UserDTO;
    let result: Result<UserDTO>;
    try {
      const validateSchema = {
        required: ['name'],
      };
      Validator.validateBySchema(validateSchema, userProps);
      // 判断用户是否存在{name来判断}
      const existUser = await this.userRepository.getUserByName(userProps.name);
      if (existUser) {
        throw new CreateUserError('用户名重复');
      }
      user = await this.userRepository.createUser(userProps);
      result = new Result(null, '创建用户成功', user);
    } catch (error) {
      // 特定错误处理在BaseError之上处理
      if (error instanceof BaseError) {
        result = new Result(error, '创建用户失败');
      } else {
        userLogger.error('server_error: \n', 'req: ', userProps, '\nerror: ', error);
        result = new Result(new ServerError(), '创建用户失败');
      }
    }

    return result;
  }
}
