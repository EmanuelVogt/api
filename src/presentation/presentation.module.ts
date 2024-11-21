import { Module } from '@nestjs/common';
import { BarbershopController } from './controllers/barber-shop.controller';
import { ApplicationModule } from '../application/application.module';
import { AppointmentController } from './controllers/appointment.controller';
import { BarberController } from './controllers/barber.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    BarbershopController,
    AppointmentController,
    BarberController,
    UserController,
  ],
})
export class PresentationModule {}
