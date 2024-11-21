import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAppointmentRepository } from '../../domain/repositories/i-appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';
import { IAppointmentService } from '../interfaces/appointment.service.interface';
import { AppointmentRepositoryToken } from '../../domain/repositories/appointment.repository.token';

@Injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @Inject(AppointmentRepositoryToken)
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = new Appointment(
      0, // ID será gerado pelo banco
      createAppointmentDto.userId,
      createAppointmentDto.barberId,
      createAppointmentDto.barbershopId,
      new Date(createAppointmentDto.appointmentDate),
      new Date(),
      new Date(),
    );
    return this.appointmentRepository.create(appointment);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment)
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    return appointment;
  }

  async updateAppointment(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const existingAppointment = await this.getAppointmentById(id);
    const updatedAppointment = new Appointment(
      existingAppointment.id,
      updateAppointmentDto.userId ?? existingAppointment.userId,
      updateAppointmentDto.barberId ?? existingAppointment.barberId,
      updateAppointmentDto.barbershopId ?? existingAppointment.barbershopId,
      updateAppointmentDto.appointmentDate
        ? new Date(updateAppointmentDto.appointmentDate)
        : existingAppointment.appointmentDate,
      existingAppointment.createdAt,
      new Date(),
    );
    return this.appointmentRepository.update(updatedAppointment);
  }

  async deleteAppointment(id: number): Promise<void> {
    const appointment = await this.getAppointmentById(id);
    if (!appointment)
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    await this.appointmentRepository.delete(id);
  }
}
