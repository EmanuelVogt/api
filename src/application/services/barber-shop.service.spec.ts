import { Test, TestingModule } from '@nestjs/testing';
import { BarbershopService } from './barber-shop.service';
import { BarberShop } from '../../domain/entities/barber-shop.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateBarberShopDto } from '../dtos/create-barber-shop.dto';
import { UpdateBarberShopDto } from '../dtos/update-barber-shop.dto';
import { mockBarberShopRepository } from '../../domain/repositories/mocks/barber-shop.repository.interface.mock';
import { IBarberShopRepository } from '../../domain/repositories/i-barber-shop.repository';
import { BarbershopRepositoryToken } from '../../domain/repositories/barber-shop.repository.token';

describe('BarbershopService', () => {
  let service: BarbershopService;
  let repository: IBarberShopRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarbershopService,
        {
          provide: BarbershopRepositoryToken,
          useValue: mockBarberShopRepository,
        },
      ],
    }).compile();

    service = module.get<BarbershopService>(BarbershopService);
    repository = module.get<IBarberShopRepository>(BarbershopRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBarberShop', () => {
    it('should create a barber shop', async () => {
      const dto: CreateBarberShopDto = { name: 'New BarberShop' };
      const result = await service.createBarberShop(dto);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: dto.name }),
      );
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(dto.name);
    });
  });

  describe('getAllBarberShops', () => {
    it('should return an array of barber shops', async () => {
      const result = await service.getAllBarberShops();
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('BarberShop 1');
    });
  });

  describe('getBarberShopById', () => {
    it('should return a barber shop if found', async () => {
      const result = await service.getBarberShopById(1);
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toBeInstanceOf(BarberShop);
      expect(result.name).toBe('BarberShop 1');
    });

    it('should throw NotFoundException if not found', async () => {
      await expect(service.getBarberShopById(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('updateBarberShop', () => {
    it('should update a barber shop', async () => {
      const dto: UpdateBarberShopDto = { name: 'Updated BarberShop' };
      const result = await service.updateBarberShop(1, dto);
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, name: dto.name }),
      );
      expect(result.name).toBe(dto.name);
    });

    it('should throw NotFoundException if barber shop does not exist', async () => {
      const dto: UpdateBarberShopDto = { name: 'Updated BarberShop' };
      await expect(service.updateBarberShop(999, dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('deleteBarberShop', () => {
    it('should delete a barber shop', async () => {
      await service.deleteBarberShop(1);
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if barber shop does not exist', async () => {
      await expect(service.deleteBarberShop(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findById).toHaveBeenCalledWith(999);
    });
  });
});
