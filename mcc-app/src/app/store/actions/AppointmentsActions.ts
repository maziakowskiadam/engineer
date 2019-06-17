import { Appointment } from 'src/app/shared/models/entities/Appointment';

export class GetAllAppointments {
    static readonly type = '[AppointmentsState] GetAllAppointments';
}

export class GetAppointments {
    public static readonly type = '[AppointmentsState] GetAppointments';
}

export class SetAppointments {
    public static readonly type = '[AppointmentsState] SetAppointments';

    constructor(public appointments: Appointment[]) { }
}
