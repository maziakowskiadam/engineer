import { Patient } from 'src/app/shared/models/entities/Patient';

export class GetPatients {
    public static readonly type = '[PatientsState] GetPatients';
}

export class SetPatients {
    public static readonly type = '[PatientsState] SetPatients';

    constructor(public patients: Patient[]) { }
}
