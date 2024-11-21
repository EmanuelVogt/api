import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Barber } from '../../domain/entities/babers.entity';
import { IBarberRepository } from '../../domain/repositories/i-barber.repository';

@Injectable()
export class PrismaBarberRepository implements IBarberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(barber: Barber): Promise<Barber> {
    const createdBarber = await this.prisma.barber.create({
      data: {
        name: barber.name,
        barbershopId: barber.barbershopId,
      },
    });
    return new Barber(
      createdBarber.id,
      createdBarber.name,
      createdBarber.barbershopId,
      createdBarber.createdAt,
      createdBarber.updatedAt,
    );
  }

  async findAll(): Promise<Barber[]> {
    const barbers = await this.prisma.barber.findMany();
    return barbers.map(
      (b) => new Barber(b.id, b.name, b.barbershopId, b.createdAt, b.updatedAt),
    );
  }

  async findById(id: number): Promise<Barber | null> {
    const barber = await this.prisma.barber.findUnique({ where: { id } });
    if (!barber) return null;
    return new Barber(
      barber.id,
      barber.name,
      barber.barbershopId,
      barber.createdAt,
      barber.updatedAt,
    );
  }

  async update(barber: Barber): Promise<Barber> {
    const updatedBarber = await this.prisma.barber.update({
      where: { id: barber.id },
      data: {
        name: barber.name,
        barbershopId: barber.barbershopId,
      },
    });
    return new Barber(
      updatedBarber.id,
      updatedBarber.name,
      updatedBarber.barbershopId,
      updatedBarber.createdAt,
      updatedBarber.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.barber.delete({ where: { id } });
  }
}
