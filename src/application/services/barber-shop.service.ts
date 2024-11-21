import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BarberShop } from '../../domain/entities/barber-shop.entity';
import { CreateBarberShopDto } from '../dtos/create-barber-shop.dto';
import { UpdateBarberShopDto } from '../dtos/update-barber-shop.dto';
import { IBarberShopService } from '../interfaces/barber-shop.service.interface';
import { BarbershopRepositoryToken } from '../../domain/repositories/barber-shop.repository.token';
import { IBarberShopRepository } from '../../domain/repositories/i-barber-shop.repository';

@Injectable()
export class BarbershopService implements IBarberShopService {
  constructor(
    @Inject(BarbershopRepositoryToken)
    private readonly barberShopRepository: IBarberShopRepository,
  ) {}

  async createBarberShop(
    createBarberShopDto: CreateBarberShopDto,
  ): Promise<BarberShop> {
    const barberShop = new BarberShop(
      0,
      createBarberShopDto.name,
      new Date(),
      new Date(),
    );
    return this.barberShopRepository.create(barberShop);
  }

  async getAllBarberShops(): Promise<BarberShop[]> {
    return this.barberShopRepository.findAll();
  }

  async getBarberShopById(id: number): Promise<BarberShop | null> {
    const barberShop = await this.barberShopRepository.findById(id);
    if (!barberShop)
      throw new NotFoundException(`BarberShop with ID ${id} not found`);
    return barberShop;
  }

  async updateBarberShop(
    id: number,
    updateBarberShopDto: UpdateBarberShopDto,
  ): Promise<BarberShop> {
    const existingBarberShop = await this.getBarberShopById(id);
    const updatedBarberShop = new BarberShop(
      existingBarberShop.id,
      updateBarberShopDto.name ?? existingBarberShop.name,
      existingBarberShop.createdAt,
      new Date(),
    );
    return this.barberShopRepository.update(updatedBarberShop);
  }

  async deleteBarberShop(id: number): Promise<void> {
    const barberShop = await this.getBarberShopById(id);
    if (!barberShop)
      throw new NotFoundException(`BarberShop with ID ${id} not found`);
    await this.barberShopRepository.delete(id);
  }
}
