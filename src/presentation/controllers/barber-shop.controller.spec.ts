// src/presentation/controllers/barber-shop.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BarberShopController } from './barber-shop.controller';
import { BarberShopServiceToken } from '../../application/interfaces/barber-shop.service.token';
import { IBarberShopService } from '../../application/interfaces/barber-shop.service.interface';
import { CreateBarberShopDto } from '../../application/dtos/create-barber-shop.dto';
import { UpdateBarberShopDto } from '../../application/dtos/update-barber-shop.dto';
import { BarberShop } from '../../domain/entities/barber-shop.entity';
import { mockBarberShopService } from '../../application/services/mock/barber-shop.service.mock';

describe('BarberShopController', () => {
  let controller: BarberShopController;
  let service: jest.Mocked<IBarberShopService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarberShopController],
      providers: [
        {
          provide: BarberShopServiceToken,
          useValue: mockBarberShopService, // Injetando o mock
        },
      ],
    }).compile();

    controller = module.get<BarberShopController>(BarberShopController);
    service = module.get<jest.Mocked<IBarberShopService>>(
      BarberShopServiceToken,
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createBarberShop', () => {
    it('should create a barber shop', async () => {
      const dto: CreateBarberShopDto = { name: 'New BarberShop' };
      const mockResult: BarberShop = new BarberShop(
        1,
        dto.name,
        new Date(),
        new Date(),
      );

      // Configura o mock para retornar o resultado esperado
      service.createBarberShop.mockResolvedValue(mockResult);

      const result = await controller.createBarberShop(dto);

      // Verifica se o método do serviço foi chamado com os argumentos corretos
      expect(service.createBarberShop).toHaveBeenCalledWith(dto);

      // Verifica se o resultado está correto
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(dto.name);
    });
  });

  describe('getAllBarberShops', () => {
    it('should return an array of barber shops', async () => {
      const mockResult: BarberShop[] = [
        new BarberShop(1, 'BarberShop 1', new Date(), new Date()),
        new BarberShop(2, 'BarberShop 2', new Date(), new Date()),
      ];

      service.getAllBarberShops.mockResolvedValue(mockResult);

      const result = await controller.getAllBarberShops();

      expect(service.getAllBarberShops).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('BarberShop 1');
    });
  });

  describe('getBarberShopById', () => {
    it('should return a barber shop if found', async () => {
      const mockResult: BarberShop = new BarberShop(
        1,
        'BarberShop 1',
        new Date(),
        new Date(),
      );

      service.getBarberShopById.mockResolvedValue(mockResult);

      const result = await controller.getBarberShopById(1);

      expect(service.getBarberShopById).toHaveBeenCalledWith(1);
      expect(result).toBeInstanceOf(BarberShop);
      expect(result.name).toBe('BarberShop 1');
    });

    it('should return null if barber shop not found', async () => {
      service.getBarberShopById.mockResolvedValue(null);

      const result = await controller.getBarberShopById(999);

      expect(service.getBarberShopById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });

  describe('updateBarberShop', () => {
    it('should update a barber shop', async () => {
      const dto: UpdateBarberShopDto = { name: 'Updated BarberShop' };
      const mockResult: BarberShop = new BarberShop(
        1,
        dto.name,
        new Date(),
        new Date(),
      );

      service.updateBarberShop.mockResolvedValue(mockResult);

      const result = await controller.updateBarberShop(1, dto);

      expect(service.updateBarberShop).toHaveBeenCalledWith(1, dto);
      expect(result.name).toBe(dto.name);
    });
  });

  describe('deleteBarberShop', () => {
    it('should delete a barber shop', async () => {
      service.deleteBarberShop.mockResolvedValue(undefined);

      await controller.deleteBarberShop(1);

      expect(service.deleteBarberShop).toHaveBeenCalledWith(1);
    });
  });
});
