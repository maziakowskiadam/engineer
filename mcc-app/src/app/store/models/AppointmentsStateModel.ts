import { Appointment } from 'src/app/shared/models/entities/Appointment';

export interface AppointmentsStateModel {
    appointments: Appointment[];
    loading?: boolean;
}
