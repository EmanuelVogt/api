import { Module } from '@nestjs/common';
import { BarberShopController } from './controllers/barber-shop.controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [BarberShopController],
})
export class PresentationModule {}
