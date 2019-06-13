import { Doctor } from 'src/app/shared/models/entities/Doctor';


export interface DoctorsStateModel {
    doctors: Doctor[];
    loading: boolean;
}
