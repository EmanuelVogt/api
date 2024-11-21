import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  barbershopId: number;
}
