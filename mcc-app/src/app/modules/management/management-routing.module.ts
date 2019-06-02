import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';

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
export class ManagementRoutingModule {}
