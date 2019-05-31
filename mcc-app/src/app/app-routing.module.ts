import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { ManagementPageComponent } from './pages/management-page/management-page.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { PagesModule } from './pages/pages.module';
import { AddPatientPageComponent } from './pages/add-patient-page/add-patient-page.component';
import { AddAppointmentPageComponent } from './pages/add-appointment-page/add-appointment-page.component';
import { IdentityGuard } from './guards/identity.guard';
import { RouteUrl } from './constants/route.constants';
import { AppointmentsPageComponent } from './pages/appointments-page/appointments-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { PasswordRecoveryPageComponent } from './pages/password-recovery-page/password-recovery-page.component';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { NewAppointmentPageComponent } from './pages/new-appointment-page/new-appointment-page.component';
import { AddDoctorPageComponent } from './pages/add-doctor-page/add-doctor-page.component';
import { AddRoomPageComponent } from './pages/add-room-page/add-room-page.component';
import { ActivateAccountPageComponent } from './pages/activate-account-page/activate-account-page.component';

// const routes: Routes = [
//     {
//         path: RouteUrl.LOGIN,
//         component: LoginPageComponent
//     },
//     {
//         path: 'password-recovery',
//         component: PasswordRecoveryPageComponent
//     },
//     {
//         path: RouteUrl.DOCTORS,
//         component: DoctorsPageComponent,
//         // canActivate: [IdentityGuard],
//     },
//     {
//         path: RouteUrl.PATIENTS,
//         component: PatientPageComponent,
//         // canActivate: [IdentityGuard],
//     },
//     {
//         path: RouteUrl.UNAUTHORIZED,
//         component: UnauthorizedPageComponent
//     },
//     {
//         path: RouteUrl.MANAGEMENT,
//         component: ManagementPageComponent
//     },
//     {
//         path: 'add-doctor',
//         component: AddDoctorPageComponent
//     },
//     {
//         path: 'add-room',
//         component: AddRoomPageComponent
//     },
//     {
//         path: 'add-patient',
//         component: AddPatientPageComponent
//     },
//     {
//         path: 'activate-account',
//         component: ActivateAccountPageComponent
//     },
//     {
//         path: 'add-appointment',
//         component: AddAppointmentPageComponent
//     },
//     {
//         path: 'appointments',
//         component: AppointmentsPageComponent
//     },
//     {
//         path: 'results',
//         component: ResultsPageComponent
//     },
//     {
//         path: 'account-settings',
//         component: AccountSettingsPageComponent
//     },
//     {
//         path: 'new-appointment',
//         component: NewAppointmentPageComponent
//     },
//     {
//         path: '',
//         component: DefaultPageComponent,
//         pathMatch: 'full'
//     }
// ];

const routes: Routes = [
    {
        path: 'identity',
        loadChildren: () => import('./modules/identity/identity.module').then(mod => mod.IdentityModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule)
    }
];

@NgModule({
    // declarations: [
    // ],
    imports: [
        // PagesModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
