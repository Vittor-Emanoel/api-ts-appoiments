import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//Receber a requisição, chamar outro arquivo pra tratar a requisição, devolver uma respostas

//Transformação de dados fica na rota
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointments = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointments.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    } else {
      return response.status(400).json({ error: 'Unexpected error' });
    }
  }
});

export default appointmentsRouter;
