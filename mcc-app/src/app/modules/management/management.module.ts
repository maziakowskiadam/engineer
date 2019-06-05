import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AddExaminationTypeComponent } from './components/add-examination-type/add-examination-type.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';

@NgModule({
    declarations: [
        ManagementIndexComponent,
        AddDoctorComponent,
        AddRoomComponent,
        AddExaminationTypeComponent,
        AddPatientComponent,
        DoctorsListComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        ManagementRoutingModule
    ]
})
export class ManagementModule { }
