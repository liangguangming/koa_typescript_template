import * as Router from 'koa-router';
import UserController from '../controllers/user/userController';
import UserRepository from '../models/user/userRepository';
import CreateUserDTO from '../controllers/user/dto/createUserDTO';

const user = new Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

user.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await userController.getUserById(id);
  ctx.body = result;
});

user.post('/', async (ctx) => {
  const userProps = ctx.request.body;
  const reqDTO: CreateUserDTO = {
    name: userProps.name,
    age: userProps.age,
  };
  const result = await userController.createUser(reqDTO);
  ctx.body = result;
});

export default user.routes();
