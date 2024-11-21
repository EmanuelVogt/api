import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaBarberRepository } from './repositories/prisma-barber.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { PrismaAppointmentRepository } from './repositories/prisma-appointment.repository';
import { BarbershopRepositoryToken } from '../domain/repositories/barber-shop.repository.token';
import { PrismaBarbershopRepository } from './repositories/prisma-barber-shop.repository';
import { BarberRepositoryToken } from '../domain/repositories/barber.repository.token';
import { UserRepositoryToken } from '../domain/repositories/user.repository.token';
import { AppointmentRepositoryToken } from '../domain/repositories/appointment.repository.token';
@Module({
  providers: [
    PrismaService,
    {
      provide: BarbershopRepositoryToken,
      useClass: PrismaBarbershopRepository,
    },
    {
      provide: BarberRepositoryToken,
      useClass: PrismaBarberRepository,
    },
    {
      provide: UserRepositoryToken,
      useClass: PrismaUserRepository,
    },
    {
      provide: AppointmentRepositoryToken,
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [
    BarbershopRepositoryToken,
    BarberRepositoryToken,
    UserRepositoryToken,
    AppointmentRepositoryToken,
    PrismaService,
  ],
})
export class InfrastructureModule {}
