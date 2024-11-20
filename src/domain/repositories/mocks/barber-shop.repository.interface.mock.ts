import { BarberShop } from '../../../domain/entities/barber-shop.entity';

export const mockBarberShopRepository = {
  create: jest.fn((barberShop: BarberShop) => {
    return Promise.resolve({
      ...barberShop,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }),
  findAll: jest.fn(() => {
    return Promise.resolve([
      new BarberShop(1, 'BarberShop 1', new Date(), new Date()),
      new BarberShop(2, 'BarberShop 2', new Date(), new Date()),
    ]);
  }),
  findById: jest.fn((id: number) => {
    if (id === 1) {
      return Promise.resolve(
        new BarberShop(1, 'BarberShop 1', new Date(), new Date()),
      );
    }
    return Promise.resolve(null);
  }),
  update: jest.fn((barberShop: BarberShop) => {
    return Promise.resolve(barberShop);
  }),
  delete: jest.fn((id: number) => {
    return Promise.resolve(id);
  }),
};
