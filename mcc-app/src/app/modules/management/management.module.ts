import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule as AngularFormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { FormsModule } from 'src/app/shared/forms/forms.module';
import { AddManagementComponent } from './components/add-management/add-management.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { PatientAuthorizeComponent } from './components/patient-authorize/patient-authorize.component';

@NgModule({
    declarations: [
        ManagementIndexComponent,
        AddDoctorComponent,
        AddRoomComponent,
        AddExaminationTypeComponent,
        AddPatientComponent,
        DoctorsListComponent,
        PatientsListComponent,
        AddManagementComponent,
        AddAppointmentComponent,
        PatientAuthorizeComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        AngularFormsModule,
        ManagementRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class ManagementModule { }
