import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { IAppointmentService } from '../../application/interfaces/appointment.service.interface';
import { AppointmentServiceToken } from '../../application/interfaces/appointment.service.token';
import { Appointment } from '../../domain/entities/appointment.entity';
import { CreateAppointmentDto } from '../../application/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../../application/dtos/update-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(
    @Inject(AppointmentServiceToken)
    private readonly appointmentService: IAppointmentService,
  ) {}

  @Post()
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get()
  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentService.getAllAppointments();
  }

  @Get(':id')
  async getAppointmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Appointment | null> {
    return this.appointmentService.getAppointmentById(id);
  }

  @Put(':id')
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.updateAppointment(id, updateAppointmentDto);
  }

  @Delete(':id')
  async deleteAppointment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.appointmentService.deleteAppointment(id);
  }
}
