import { Injectable, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from 'src/app/app-config.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPatientDto } from '../models/dtos/AddPatientDto';
import { AddDoctorDto } from '../models/dtos/AddDoctorDto';

@Injectable()
export class RegisterService {

    private apiUrl: string;

    constructor(
        @Inject(APP_CONFIG) appConfig: AppConfig,
        private http: HttpClient
    ) {
        this.apiUrl = appConfig.apiUrl;
    }

    addPatient(addPatientDto: AddPatientDto): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/patients/add`, addPatientDto);
    }

    addDoctor(addDoctorDto: AddDoctorDto): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/doctors/add`, addDoctorDto);
    }


}
