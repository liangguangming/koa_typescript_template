import { describe, it, before, after } from 'mocha';
import * as assert from 'power-assert';
import * as randomStr from 'string-random';
import * as mongoose from 'mongoose';
import * as sinon from 'sinon';

import UserRepository from '../../../src/models/user/userRepository';
import UserController from '../../../src/controllers/user/userController';
import UserParamError from '../../../src/controllers/user/errors/UserParamError';
import Result from '../../../src/global/result';
import UserNotFoundError from '../../../src/controllers/user/errors/userNotFoundError';
import ServerError from '../../../src/global/errors/serverError';
import DataValidateError from '../../../src/global/errors/dataValidateError';
import CreateUserError from '../../../src/controllers/user/errors/CreateUserError';

describe('User', () => {
  const userRepository = new UserRepository();
  const userController = new UserController(userRepository);
  describe('getUserById', function getUserByIdTest() {
    const userId = mongoose.Types.ObjectId().toHexString();
    const noneExistUserId = mongoose.Types.ObjectId().toHexString();
    const otherErrorId = mongoose.Types.ObjectId().toHexString();

    const getNormalUserByIdData = {
      id: userId,
      name: randomStr(10),
      age: Math.floor(Math.random() * 100),
    };

    before((done) => {
      const getUserByIdStub = sinon.stub(userRepository, 'getUserById');
      getUserByIdStub.withArgs(userId).resolves(getNormalUserByIdData);
      getUserByIdStub.withArgs(noneExistUserId).resolves(null);
      getUserByIdStub.withArgs(otherErrorId).throwsException('Mongodb');
      done();
    });

    this.timeout(3000);

    it('should return UserParamError when the id is not present', async () => {
      let id;
      const result = await userController.getUserById(id);
      const error = new UserParamError('缺少用户ID');
      assert.deepStrictEqual(result, new Result(error, `获取用户 ${id} 信息失败`));
    });

    it('should return UserParamError when the id is invalid', async () => {
      const invalidId = `${mongoose.Types.ObjectId().toHexString()}d`;
      const result = await userController.getUserById(invalidId);
      const error = new UserParamError('用户ID不对');
      assert.deepStrictEqual(result, new Result(error, `获取用户 ${invalidId} 信息失败`));
    });

    it('get a not exist user', async () => {
      const result = await userController.getUserById(noneExistUserId);
      const error = new UserNotFoundError();
      assert.deepStrictEqual(result, new Result(error, `获取用户 ${noneExistUserId} 信息失败`));
    });

    it('other Error', async () => {
      const result = await userController.getUserById(otherErrorId);
      const error = new ServerError();
      assert.deepStrictEqual(result, new Result(error, '获取用户失败'));
    });

    it('get normal user', async () => {
      const result = await userController.getUserById(userId);
      assert.deepStrictEqual(result, new Result(null, `获取到${userId}用户的信息`, getNormalUserByIdData));
    });
  });

  describe('createUser', () => {
    const normalUserProps = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: randomStr(10),
      age: Math.floor(Math.random() * 100),
    };

    const noNameProps = {
      name: '',
      age: Math.floor(Math.random() * 100),
    };

    delete noNameProps.name;

    const existUserProps = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: randomStr(10),
      age: Math.floor(Math.random() * 100),
    };

    before(() => {
      const getUserByNameStub = sinon.stub(userRepository, 'getUserByName');
      getUserByNameStub.withArgs(normalUserProps.name).resolves(null);
      getUserByNameStub.withArgs(existUserProps.name).resolves(existUserProps);

      const createUserStub = sinon.stub(userRepository, 'createUser');
      createUserStub.withArgs(normalUserProps).resolves(normalUserProps);
    });

    it('not UserName', async () => {
      const result = await userController.createUser(noNameProps);
      const error = new DataValidateError(`undefined, should have required property 'name' `, null);
      assert.deepStrictEqual(result, new Result(error, '创建用户失败'));
    });

    it('exist User', async () => {
      const result = await userController.createUser(existUserProps);
      const error = new CreateUserError('用户名重复');
      assert.deepStrictEqual(result, new Result(error, '创建用户失败'));
    });

    it('normal create user', async () => {
      const result = await userController.createUser(normalUserProps);
      assert.deepStrictEqual(result, new Result(null, '创建用户成功', normalUserProps));
    });
  });
});

after(() => {
  sinon.restore();
});
