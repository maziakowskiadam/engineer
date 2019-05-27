import { Doctor } from 'src/app/models/Doctor';

export interface DoctorsStateModel {
    doctors: Doctor[];
    loading: boolean;
}
