import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment } from '../../domain/entities/appointment.entity';
import { IAppointmentRepository } from '../../domain/repositories/i-appointment.repository';

@Injectable()
export class PrismaAppointmentRepository implements IAppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(appointment: Appointment): Promise<Appointment> {
    const createdAppointment = await this.prisma.appointment.create({
      data: {
        userId: appointment.userId,
        barberId: appointment.barberId,
        barbershopId: appointment.barbershopId,
        appointmentDate: appointment.appointmentDate,
      },
    });
    return new Appointment(
      createdAppointment.id,
      createdAppointment.userId,
      createdAppointment.barberId,
      createdAppointment.barbershopId,
      createdAppointment.appointmentDate,
      createdAppointment.createdAt,
      createdAppointment.updatedAt,
    );
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany();
    return appointments.map(
      (a) =>
        new Appointment(
          a.id,
          a.userId,
          a.barberId,
          a.barbershopId,
          a.appointmentDate,
          a.createdAt,
          a.updatedAt,
        ),
    );
  }

  async findById(id: number): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) return null;
    return new Appointment(
      appointment.id,
      appointment.userId,
      appointment.barberId,
      appointment.barbershopId,
      appointment.appointmentDate,
      appointment.createdAt,
      appointment.updatedAt,
    );
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        userId: appointment.userId,
        barberId: appointment.barberId,
        barbershopId: appointment.barbershopId,
        appointmentDate: appointment.appointmentDate,
      },
    });
    return new Appointment(
      updatedAppointment.id,
      updatedAppointment.userId,
      updatedAppointment.barberId,
      updatedAppointment.barbershopId,
      updatedAppointment.appointmentDate,
      updatedAppointment.createdAt,
      updatedAppointment.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.appointment.delete({ where: { id } });
  }
}
