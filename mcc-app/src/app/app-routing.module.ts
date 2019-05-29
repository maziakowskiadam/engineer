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

const routes: Routes = [
    {
        path: RouteUrl.LOGIN,
        component: LoginPageComponent
    },
    {
        path: RouteUrl.DOCTORS,
        component: DoctorsPageComponent,
        canActivate: [IdentityGuard],
    },
    {
        path: RouteUrl.PATIENTS,
        component: PatientPageComponent,
        canActivate: [IdentityGuard],
    },
    {
        path: RouteUrl.UNAUTHORIZED,
        component: UnauthorizedPageComponent
    },
    {
        path: RouteUrl.MANAGEMENT,
        component: ManagementPageComponent
    },
    {
        path: 'add-patient',
        component: AddPatientPageComponent
    },
    {
        path: 'add-appointment',
        component: AddAppointmentPageComponent
    },
    {
        path: '',
        component: DefaultPageComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    // declarations: [
    // ],
    imports: [
        PagesModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
