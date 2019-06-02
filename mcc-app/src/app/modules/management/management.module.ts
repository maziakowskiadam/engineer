import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
    declarations: [
        ManagementIndexComponent,
        AddDoctorComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        ManagementRoutingModule
    ]
})
export class ManagementModule { }
