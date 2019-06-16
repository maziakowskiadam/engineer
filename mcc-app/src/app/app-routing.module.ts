import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    },
    {
        path: 'management',
        loadChildren: () => import('./modules/management/management.module').then(mod => mod.ManagementModule)
    },
    {
        path: 'doctor',
        loadChildren: () => import('./modules/doctor/doctor.module').then(mod => mod.DoctorModule)
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
