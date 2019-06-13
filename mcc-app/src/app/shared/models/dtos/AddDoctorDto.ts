import { Doctor } from '../entities/Doctor';
import { LoginDto } from './LoginDto';

export interface AddDoctorDto {
    doctor: Doctor;
    identity: LoginDto;
}
