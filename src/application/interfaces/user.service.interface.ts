import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
