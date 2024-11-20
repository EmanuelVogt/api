import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBarberShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
