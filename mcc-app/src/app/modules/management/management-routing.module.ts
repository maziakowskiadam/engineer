import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';

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
