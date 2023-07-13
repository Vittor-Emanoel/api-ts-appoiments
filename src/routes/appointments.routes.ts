import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

//Receber a requisição, chamar outro arquivo pra tratar a requisição, devolver uma respostas

//Transformação de dados fica na rota
appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointments = new CreateAppointmentService();

    const appointment = await createAppointments.execute({
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
