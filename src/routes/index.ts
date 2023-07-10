import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import '../database';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
