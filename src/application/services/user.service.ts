import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserRepository } from '../../domain/repositories/i-user.repository';
import { IUserService } from '../interfaces/user.service.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepositoryToken } from 'src/domain/repositories/user.repository.token';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(
      0,
      createUserDto.name,
      createUserDto.email,
      new Date(),
      new Date(),
    );
    return this.userRepository.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.getUserById(id);
    const updatedUser = new User(
      existingUser.id,
      updateUserDto.name ?? existingUser.name,
      updateUserDto.email ?? existingUser.email,
      existingUser.createdAt,
      new Date(),
    );
    return this.userRepository.update(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await this.userRepository.delete(id);
  }
}
