import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaBarberShopRepository } from './repositories/prisma-barber-shop.repository';
import { BarberShopRepositoryToken } from '../domain/repositories/barber-shop.repository.token';

@Module({
  providers: [
    PrismaService,
    {
      provide: BarberShopRepositoryToken,
      useClass: PrismaBarberShopRepository,
    },
  ],
  exports: [BarberShopRepositoryToken, PrismaService],
})
export class InfrastructureModule {}
