// src/application/application.module.ts

import { Module } from '@nestjs/common';
import { BarberShopService } from './services/barber-shop.service';
import { BarberShopServiceToken } from './interfaces/barber-shop.service.token';
import { InfrastructureModule } from '../infraestructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: BarberShopServiceToken,
      useClass: BarberShopService,
    },
  ],
  exports: [BarberShopServiceToken],
})
export class ApplicationModule {}
