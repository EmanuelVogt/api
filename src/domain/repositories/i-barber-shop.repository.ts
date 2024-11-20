import { BarberShop } from '../entities/barber-shop.entity';

export const IBarberShopRepository = Symbol('IBarberShopRepository');

export interface IBarberShopRepository {
  create(barberShop: BarberShop): Promise<BarberShop>;
  findAll(): Promise<BarberShop[]>;
  findById(id: number): Promise<BarberShop | null>;
  update(barberShop: BarberShop): Promise<BarberShop>;
  delete(id: number): Promise<void>;
}
