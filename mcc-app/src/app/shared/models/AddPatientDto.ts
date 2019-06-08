import { Patient } from './Patient';
import { LoginDto } from './LoginDto';

export interface AddPatientDto {
    patient: Patient;
    identity: LoginDto;
}
