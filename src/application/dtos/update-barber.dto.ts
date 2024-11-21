import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateBarberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  barbershopId?: number;
}
