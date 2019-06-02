import { Injectable, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../app-config.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';

@Injectable()
export class ApiIdentityService {

    private apiUrl: string;

    constructor(
        @Inject(APP_CONFIG) appConfig: AppConfig,
        private http: HttpClient
    ) {
        this.apiUrl = appConfig.identityUrl;
    }

    login(email: string, password: string): Observable<Login> {
        return this.http.post<Login>(`${this.apiUrl}/Identity/Login`, {
            email,
            password
        });
    }

}
