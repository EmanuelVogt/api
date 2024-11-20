import { Injectable } from '@nestjs/common';
import { BarberShop } from '../../domain/entities/barber-shop.entity';
import { PrismaService } from '../prisma/prisma.service';
import { IBarberShopRepository } from '../../domain/repositories/i-barber-shop.repository';

@Injectable()
export class PrismaBarberShopRepository implements IBarberShopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(barberShop: BarberShop): Promise<BarberShop> {
    const createdBarberShop = await this.prisma.barberShop.create({
      data: {
        name: barberShop.name,
      },
    });
    return new BarberShop(
      createdBarberShop.id,
      createdBarberShop.name,
      createdBarberShop.createdAt,
      createdBarberShop.updatedAt,
    );
  }

  async findAll(): Promise<BarberShop[]> {
    const barberShops = await this.prisma.barberShop.findMany();
    return barberShops.map(
      (b) => new BarberShop(b.id, b.name, b.createdAt, b.updatedAt),
    );
  }

  async findById(id: number): Promise<BarberShop | null> {
    const barberShop = await this.prisma.barberShop.findUnique({
      where: { id },
    });
    if (!barberShop) return null;
    return new BarberShop(
      barberShop.id,
      barberShop.name,
      barberShop.createdAt,
      barberShop.updatedAt,
    );
  }

  async update(barberShop: BarberShop): Promise<BarberShop> {
    const updatedBarberShop = await this.prisma.barberShop.update({
      where: { id: barberShop.id },
      data: {
        name: barberShop.name,
      },
    });
    return new BarberShop(
      updatedBarberShop.id,
      updatedBarberShop.name,
      updatedBarberShop.createdAt,
      updatedBarberShop.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.barberShop.delete({ where: { id } });
  }
}
