import { Barber } from '../entities/babers.entity';

export interface IBarberRepository {
  create(barber: Barber): Promise<Barber>;
  findAll(): Promise<Barber[]>;
  findById(id: number): Promise<Barber | null>;
  update(barber: Barber): Promise<Barber>;
  delete(id: number): Promise<void>;
}
