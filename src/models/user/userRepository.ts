import * as mongoose from 'mongoose';
import IUserRepository from './IUserRepository';
import CreateUserDTO from '../../controllers/user/dto/createUserDTO';
import UserDTO from '../../controllers/user/dto/userDTO';

const UserSchema = new mongoose.Schema({ name: String, age: Number });

interface IUser extends mongoose.Document {
  id: string,
  name: string,
  age: number
}

export default class UserRepository implements IUserRepository {
  private model : mongoose.Model<IUser>;

  constructor() {
    this.model = mongoose.model<IUser>('user', UserSchema);
  }

  async getUserById(id: string): Promise<UserDTO> {
    const userDocument = await this.model.findById(id);
    if (!userDocument) {
      return null;
    }
    return { id: userDocument.id, name: userDocument.name, age: userDocument.age };
  }

  async getUserByName(name: string): Promise<UserDTO> {
    const userDocument = await this.model.findOne({ name });
    if (!userDocument) {
      return null;
    }
    return { id: userDocument.id, name: userDocument.name, age: userDocument.age };
  }

  async createUser(userProps: CreateUserDTO): Promise<UserDTO> {
    const userDocument = await this.model.create(userProps);
    return { id: userDocument.id, name: userDocument.name, age: userDocument.age };
  }
}
