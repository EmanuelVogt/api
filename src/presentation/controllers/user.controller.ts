import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { IUserService } from '../../application/interfaces/user.service.interface';
import { UserServiceToken } from '../../application/interfaces/user.service.token';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { CreateUserDto } from '../../application/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: IUserService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
