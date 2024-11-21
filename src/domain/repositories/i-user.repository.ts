import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
