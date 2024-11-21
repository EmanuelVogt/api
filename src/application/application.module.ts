import { Module } from '@nestjs/common';
import { BarberService } from './services/barber.service';
import { UserService } from './services/user.service';
import { AppointmentService } from './services/appointment.service';
import { BarberServiceToken } from './interfaces/barber.service.token';
import { BarbershopServiceToken } from './interfaces/barber-shop.service.token';
import { AppointmentServiceToken } from './interfaces/appointment.service.token';
import { InfrastructureModule } from 'src/infraestructure/infrastructure.module';
import { UserServiceToken } from './interfaces/user.service.token';
import { BarbershopService } from './services/barber-shop.service';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: BarberServiceToken,
      useClass: BarberService,
    },
    {
      provide: BarbershopServiceToken,
      useClass: BarbershopService,
    },
    {
      provide: UserServiceToken,
      useClass: UserService,
    },
    {
      provide: AppointmentServiceToken,
      useClass: AppointmentService,
    },
  ],
  exports: [
    BarbershopServiceToken,
    BarberServiceToken,
    UserServiceToken,
    AppointmentServiceToken,
  ],
})
export class ApplicationModule {}
