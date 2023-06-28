import { isEqual, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentsDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentsDTO): Appointment {
    const appointment = new Appointment({
      provider,
      date,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(parsedDate: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment => {
      return isEqual(parsedDate, appointment.date);
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
