import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DoctorIndexComponent } from './components/doctor-index/doctor-index.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
// import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'index'
    },
    {
        path: 'index',
        component: DoctorIndexComponent
    },
    {
        path: 'appointment/:appointmentId',
        component: DoctorAppointmentComponent
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
export class DoctorRoutingModule { }
