"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
const typeorm_1 = require("typeorm");
class CreateAppointmentService {
    async execute({ date, provider }) {
        const appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
        const appointmentDate = date_fns_1.startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
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
exports.default = CreateAppointmentService;
