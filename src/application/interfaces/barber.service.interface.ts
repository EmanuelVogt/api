import { Barber } from '../../domain/entities/babers.entity';
import { CreateBarberDto } from '../dtos/create-barber.dto';
import { UpdateBarberDto } from '../dtos/update-barber.dto';

export interface IBarberService {
  createBarber(createBarberDto: CreateBarberDto): Promise<Barber>;
  getAllBarbers(): Promise<Barber[]>;
  getBarberById(id: number): Promise<Barber | null>;
  updateBarber(id: number, updateBarberDto: UpdateBarberDto): Promise<Barber>;
  deleteBarber(id: number): Promise<void>;
}
