import { IsOptional, IsString } from 'class-validator';

export class UpdateBarberShopDto {
  @IsOptional()
  @IsString()
  name?: string;
}
