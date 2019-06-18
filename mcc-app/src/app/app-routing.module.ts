import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementGuardService } from './modules/management/management-guard.service';
import { DoctorGuardService } from './modules/doctor/doctor-guard.service';
import { PatientGuardService } from './modules/patient/patient-guard.service';

const routes: Routes = [
    {
        path: 'identity',
        loadChildren: () => import('./modules/identity/identity.module').then(mod => mod.IdentityModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule)
    },
    {
        path: 'management',
        loadChildren: () => import('./modules/management/management.module').then(mod => mod.ManagementModule),
        canActivate: [ManagementGuardService]
    },
    {
        path: 'doctor',
        loadChildren: () => import('./modules/doctor/doctor.module').then(mod => mod.DoctorModule),
        canActivate: [DoctorGuardService]
    },
    {
        path: 'patient',
        loadChildren: () => import('./modules/patient/patient.module').then(mod => mod.PatientModule),
        canActivate: [PatientGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
