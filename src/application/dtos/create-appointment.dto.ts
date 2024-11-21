import { IsInt, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  userId: number;

  @IsInt()
  barberId: number;

  @IsInt()
  barbershopId: number;

  @IsDateString()
  appointmentDate: string; // ISO date string
}
