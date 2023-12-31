import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

//  -> Recebimento das informações
//  -> Tratativa de error/excessões
//  -> Acesso ao repositório

// -> Principe Dependency Inversion (SOLID)

interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
