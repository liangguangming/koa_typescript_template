import UserDTO from '../../controllers/user/dto/userDTO';
import CreateUserDTO from '../../controllers/user/dto/createUserDTO';

export default interface IUserRepository {
  getUserById(id: string): Promise<UserDTO>;
  getUserByName(name: string): Promise<UserDTO>;
  createUser(userProps: CreateUserDTO): Promise<UserDTO>;
}
