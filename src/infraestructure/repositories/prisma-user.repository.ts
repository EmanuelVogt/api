import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/i-user.repository';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (u) => new User(u.id, u.name, u.email, u.createdAt, u.updatedAt),
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt,
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
