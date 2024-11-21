export class Appointment {
  constructor(
    public id: number,
    public userId: number,
    public barberId: number,
    public barbershopId: number,
    public appointmentDate: Date,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
