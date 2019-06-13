import { Patient } from '../entities/Patient';
import { LoginDto } from '../dtos/LoginDto';

export interface AddPatientDto {
    patient: Patient;
    identity: LoginDto;
}
