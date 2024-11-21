import { Appointment } from '../../domain/entities/appointment.entity';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';

export interface IAppointmentService {
  createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment>;
  getAllAppointments(): Promise<Appointment[]>;
  getAppointmentById(id: number): Promise<Appointment | null>;
  updateAppointment(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment>;
  deleteAppointment(id: number): Promise<void>;
}
