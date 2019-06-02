import { Doctor } from 'src/app/shared/models/Doctor';


export interface DoctorsStateModel {
    doctors: Doctor[];
    loading: boolean;
}
