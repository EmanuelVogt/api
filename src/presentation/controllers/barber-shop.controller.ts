import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { BarbershopServiceToken } from '../../application/interfaces/barber-shop.service.token';
import { IBarberShopService } from '../../application/interfaces/barber-shop.service.interface';
import { BarberShop } from '../../domain/entities/barber-shop.entity';
import { CreateBarberShopDto } from '../../application/dtos/create-barber-shop.dto';
import { UpdateBarberShopDto } from '../../application/dtos/update-barber-shop.dto';

@Controller('barber-shops')
export class BarbershopController {
  constructor(
    @Inject(BarbershopServiceToken)
    private readonly barberShopService: IBarberShopService,
  ) {}

  @Post()
  async createBarberShop(
    @Body() createBarberShopDto: CreateBarberShopDto,
  ): Promise<BarberShop> {
    return this.barberShopService.createBarberShop(createBarberShopDto);
  }

  @Get()
  async getAllBarberShops(): Promise<BarberShop[]> {
    return this.barberShopService.getAllBarberShops();
  }

  @Get(':id')
  async getBarberShopById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BarberShop | null> {
    return this.barberShopService.getBarberShopById(id);
  }

  @Put(':id')
  async updateBarberShop(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBarberShopDto: UpdateBarberShopDto,
  ): Promise<BarberShop> {
    return this.barberShopService.updateBarberShop(id, updateBarberShopDto);
  }

  @Delete(':id')
  async deleteBarberShop(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.barberShopService.deleteBarberShop(id);
  }
}
