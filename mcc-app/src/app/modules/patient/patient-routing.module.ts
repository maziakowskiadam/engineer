import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientIndexComponent } from './components/patient-index/patient-index.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'index'
    },
    {
        path: 'index',
        component: PatientIndexComponent
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
export class PatientRoutingModule { }
