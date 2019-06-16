import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../app-config.module';
import { Observable } from 'rxjs';
import { AddDoctorDto } from '../models/dtos/AddDoctorDto';
import { AddRoomDto } from '../models/dtos/AddRoomDto';
import { Doctor } from '../models/entities/Doctor';
import { AddExaminationTypeDto } from '../models/dtos/AddExaminationTypeDto';
import { AddPatientDto } from '../models/dtos/AddPatientDto';
import { AddAppointment } from 'src/app/modules/management/models/AddAppointment';
import { Patient } from '../models/entities/Patient';
import { Appointment } from '../models/entities/Appointment';
import { Room } from '../models/entities/Room';

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

    addAppointments(appointments: AddAppointment[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/appointments/addMany`, appointments);
    }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiUrl}/patients/all`);
    }

    getAppointments(doctorIdentityId: string): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/${doctorIdentityId}`);
    }

    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(`${this.apiUrl}/rooms/all`);
    }

}
