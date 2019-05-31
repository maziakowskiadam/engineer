import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { DoctorsPageComponent } from './doctors-page/doctors-page.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { CommonModule } from '@angular/common';
import { AddPatientPageComponent } from './add-patient-page/add-patient-page.component';
import { AddAppointmentPageComponent } from './add-appointment-page/add-appointment-page.component';
import { FormsModule } from '@angular/forms';
import { AppointmentsPageComponent } from './appointments-page/appointments-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { PasswordRecoveryPageComponent } from './password-recovery-page/password-recovery-page.component';
import { AccountSettingsPageComponent } from './account-settings-page/account-settings-page.component';
import { NewAppointmentPageComponent } from './new-appointment-page/new-appointment-page.component';
import { AddDoctorPageComponent } from './add-doctor-page/add-doctor-page.component';
import { AddRoomPageComponent } from './add-room-page/add-room-page.component';
import { ActivateAccountPageComponent } from './activate-account-page/activate-account-page.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        DoctorsPageComponent,
        PatientPageComponent,
        UnauthorizedPageComponent,
        ManagementPageComponent,
        DefaultPageComponent,
        AddPatientPageComponent,
        AddAppointmentPageComponent,
        AppointmentsPageComponent,
        ResultsPageComponent,
        PasswordRecoveryPageComponent,
        AccountSettingsPageComponent,
        NewAppointmentPageComponent,
        AddDoctorPageComponent,
        AddRoomPageComponent,
        ActivateAccountPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule
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
