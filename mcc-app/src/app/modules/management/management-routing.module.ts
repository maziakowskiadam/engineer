import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AddManagementComponent } from './components/add-management/add-management.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { PatientAuthorizeComponent } from './components/patient-authorize/patient-authorize.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index'
    },
    {
        path: 'index',
        component: ManagementIndexComponent
    },
    {
        path: 'add-doctor',
        component: AddDoctorComponent
    },
    {
        path: 'add-room',
        component: AddRoomComponent
    },
    {
        path: 'add-examination-type',
        component: AddExaminationTypeComponent
    },
    {
        path: 'add-patient',
        component: AddPatientComponent
    },
    {
        path: 'doctors-list',
        component: DoctorsListComponent
    },
    {
        path: 'patients-list',
        component: PatientsListComponent
    },
    {
        path: 'add-management',
        component: AddManagementComponent
    },
    {
        path: 'add-appointment',
        component: AddAppointmentComponent
    },
    {
        path: 'patient-authorize/:patientId',
        component: PatientAuthorizeComponent
    },
    {
        path: 'book-appointment/:patientId',
        component: BookAppointmentComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ManagementRoutingModule { }
