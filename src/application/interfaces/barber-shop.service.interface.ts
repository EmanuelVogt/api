import { BarberShop } from '../../domain/entities/barber-shop.entity';
import { CreateBarberShopDto } from '../dtos/create-barber-shop.dto';
import { UpdateBarberShopDto } from '../dtos/update-barber-shop.dto';

export const IBarberShopService = Symbol('IBarberShopService');

export interface IBarberShopService {
  createBarberShop(
    createBarberShopDto: CreateBarberShopDto,
  ): Promise<BarberShop>;
  getAllBarberShops(): Promise<BarberShop[]>;
  getBarberShopById(id: number): Promise<BarberShop | null>;
  updateBarberShop(
    id: number,
    updateBarberShopDto: UpdateBarberShopDto,
  ): Promise<BarberShop>;
  deleteBarberShop(id: number): Promise<void>;
}
