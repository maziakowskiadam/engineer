import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../app-config.module';
import { Observable } from 'rxjs';
import { AddDoctorDto } from '../models/AddDoctorDto';
import { AddRoomDto } from '../models/AddRoomDto';
import { Doctor } from '../models/Doctor';
import { AddExaminationTypeDto } from '../models/AddExaminationTypeDto';
import { AddPatientDto } from '../models/AddPatientDto';

@Injectable()
export class ApiDataService {

    private apiUrl: string;

    constructor(
        @Inject(APP_CONFIG) appConfig: AppConfig,
        private http: HttpClient
    ) {
        this.apiUrl = appConfig.apiUrl;
    }

    getDoctors(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(`${this.apiUrl}/doctors/all`);
    }

    addDoctor(doctor: AddDoctorDto): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/doctors/add`, doctor);
    }

    addRoom(room: AddRoomDto): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}/rooms/add`, room);
    }

    addExaminationType(examinationType: AddExaminationTypeDto): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}/examinationTypes/add`, examinationType);
    }

    addPatient(patient: AddPatientDto): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}/patients/add`, patient);
    }
}
