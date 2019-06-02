import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../app-config.module';
import { Observable } from 'rxjs';
import { AddDoctorDto } from '../models/AddDoctorDto';

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

    addDoctor(doctor: AddDoctorDto): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}/doctors/add`, doctor);
    }

}
