import { Doctor } from 'src/app/shared/models/entities/Doctor';

export class GetAllDoctors {
    static readonly type = '[DoctorsState] GetAllDoctors';
}

export class SetDoctors {
    static readonly type = '[DoctorsState] SetDoctors';
    constructor(public doctors: Doctor[]) {}
}
