"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_fns_1 = require("date-fns");
const CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
const typeorm_1 = require("typeorm");
const appointmentsRouter = express_1.Router();
//Receber a requisição, chamar outro arquivo pra tratar a requisição, devolver uma respostas
//Transformação de dados fica na rota
appointmentsRouter.get('/', (request, response) => {
    const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
    const appointments = appointmentsRepository.find();
    return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;
        const parsedDate = date_fns_1.parseISO(date);
        const createAppointments = new CreateAppointmentService_1.default();
        const appointment = await createAppointments.execute({
            date: parsedDate,
            provider,
        });
        return response.json(appointment);
    }
    catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({ error: error.message });
        }
        else {
            return response.status(400).json({ error: 'Unexpected error' });
        }
    }
});
exports.default = appointmentsRouter;
