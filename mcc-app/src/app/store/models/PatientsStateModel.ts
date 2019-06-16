import { Patient } from 'src/app/shared/models/entities/Patient';

export interface PatientsStateModel {
    patients: Patient[];
    loading?: boolean;
}
