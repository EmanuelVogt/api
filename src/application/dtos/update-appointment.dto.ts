import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  barberId?: number;

  @IsOptional()
  @IsInt()
  barbershopId?: number;

  @IsOptional()
  @IsDateString()
  appointmentDate?: string; // ISO date string
}
