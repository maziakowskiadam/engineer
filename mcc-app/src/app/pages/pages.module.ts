import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { DoctorsPageComponent } from './doctors-page/doctors-page.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { CommonModule } from '@angular/common';
import { AddPatientPageComponent } from './add-patient-page/add-patient-page.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        DoctorsPageComponent,
        PatientPageComponent,
        UnauthorizedPageComponent,
        ManagementPageComponent,
        DefaultPageComponent,
        AddPatientPageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoginPageComponent,
        DoctorsPageComponent,
        PatientPageComponent,
        UnauthorizedPageComponent,
        ManagementPageComponent,
        DefaultPageComponent,
        AddPatientPageComponent
    ]
})
export class PagesModule { }
