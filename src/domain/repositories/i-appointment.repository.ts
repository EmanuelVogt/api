import { Appointment } from '../entities/appointment.entity';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  findById(id: number): Promise<Appointment | null>;
  update(appointment: Appointment): Promise<Appointment>;
  delete(id: number): Promise<void>;
}
