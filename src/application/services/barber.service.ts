import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBarberDto } from '../dtos/create-barber.dto';
import { UpdateBarberDto } from '../dtos/update-barber.dto';
import { BarberRepositoryToken } from '../../domain/repositories/barber.repository.token';
import { IBarberRepository } from '../../domain/repositories/i-barber.repository';
import { IBarberService } from '../interfaces/barber.service.interface';
import { Barber } from '../../domain/entities/babers.entity';

@Injectable()
export class BarberService implements IBarberService {
  constructor(
    @Inject(BarberRepositoryToken)
    private readonly barberRepository: IBarberRepository,
  ) {}

  async createBarber(createBarberDto: CreateBarberDto): Promise<Barber> {
    const barber = new Barber(
      0, // ID será gerado pelo banco
      createBarberDto.name,
      createBarberDto.barbershopId,
      new Date(),
      new Date(),
    );
    return this.barberRepository.create(barber);
  }

  async getAllBarbers(): Promise<Barber[]> {
    return this.barberRepository.findAll();
  }

  async getBarberById(id: number): Promise<Barber | null> {
    const barber = await this.barberRepository.findById(id);
    if (!barber) throw new NotFoundException(`Barber with ID ${id} not found`);
    return barber;
  }

  async updateBarber(
    id: number,
    updateBarberDto: UpdateBarberDto,
  ): Promise<Barber> {
    const existingBarber = await this.getBarberById(id);
    const updatedBarber = new Barber(
      existingBarber.id,
      updateBarberDto.name ?? existingBarber.name,
      updateBarberDto.barbershopId ?? existingBarber.barbershopId,
      existingBarber.createdAt,
      new Date(),
    );
    return this.barberRepository.update(updatedBarber);
  }

  async deleteBarber(id: number): Promise<void> {
    const barber = await this.getBarberById(id);
    if (!barber) throw new NotFoundException(`Barber with ID ${id} not found`);
    await this.barberRepository.delete(id);
  }
}
