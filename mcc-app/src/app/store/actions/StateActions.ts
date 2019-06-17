import { Patient } from 'src/app/shared/models/entities/Patient';
import { Appointment } from 'src/app/shared/models/entities/Appointment';
import { Room } from 'src/app/shared/models/entities/Room';

export class GetPatients {
    public static readonly type = '[PatientsState] GetPatients';
}

export class SetPatients {
    public static readonly type = '[PatientsState] SetPatients';

    constructor(public patients: Patient[]) { }
}

export class GetRooms {
    public static readonly type = '[RoomsState] GetRooms';
}

export class SetRooms {
    public static readonly type = '[RoomsState] SetRooms';

    constructor(public rooms: Room[]) { }
}
