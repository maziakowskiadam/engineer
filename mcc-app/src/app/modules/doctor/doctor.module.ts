import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule } from '@angular/forms';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorIndexComponent } from './components/doctor-index/doctor-index.component';


@NgModule({
    declarations: [
        DoctorIndexComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        DoctorRoutingModule,
    ]
})
export class DoctorModule { }