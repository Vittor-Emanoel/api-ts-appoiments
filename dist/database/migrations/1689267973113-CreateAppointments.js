"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointments1689267973113 = void 0;
const typeorm_1 = require("typeorm");
class CreateAppointments1689267973113 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'appointments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('appointments');
    }
}
exports.CreateAppointments1689267973113 = CreateAppointments1689267973113;
