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
import { IBarberService } from '../../application/interfaces/barber.service.interface';
import { CreateBarberDto } from '../../application/dtos/create-barber.dto';
import { BarberServiceToken } from '../../application/interfaces/barber.service.token';
import { Barber } from '../../domain/entities/babers.entity';
import { UpdateBarberDto } from '../../application/dtos/update-barber.dto';

@Controller('barbers')
export class BarberController {
  constructor(
    @Inject(BarberServiceToken)
    private readonly barberService: IBarberService,
  ) {}

  @Post()
  async createBarber(
    @Body() createBarberDto: CreateBarberDto,
  ): Promise<Barber> {
    return this.barberService.createBarber(createBarberDto);
  }

  @Get()
  async getAllBarbers(): Promise<Barber[]> {
    return this.barberService.getAllBarbers();
  }

  @Get(':id')
  async getBarberById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Barber | null> {
    return this.barberService.getBarberById(id);
  }

  @Put(':id')
  async updateBarber(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBarberDto: UpdateBarberDto,
  ): Promise<Barber> {
    return this.barberService.updateBarber(id, updateBarberDto);
  }

  @Delete(':id')
  async deleteBarber(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.barberService.deleteBarber(id);
  }
}
