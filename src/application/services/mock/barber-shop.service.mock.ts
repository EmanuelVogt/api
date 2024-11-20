import { IBarberShopService } from '../../interfaces/barber-shop.service.interface';

export const mockBarberShopService: jest.Mocked<IBarberShopService> = {
  createBarberShop: jest.fn(),
  getAllBarberShops: jest.fn(),
  getBarberShopById: jest.fn(),
  updateBarberShop: jest.fn(),
  deleteBarberShop: jest.fn(),
};
