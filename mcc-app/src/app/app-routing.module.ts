import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DoctorsPageComponent } from './pages/doctors-page/doctors-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { ManagementPageComponent } from './pages/management-page/management-page.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'doctors',
        component: DoctorsPageComponent
    },
    {
        path: 'patients',
        component: PatientPageComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedPageComponent
    },
    {
        path: 'management',
        component: ManagementPageComponent
    },
    {
        path: '',
        component: DefaultPageComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        LoginPageComponent,
        DoctorsPageComponent,
        PatientPageComponent,
        UnauthorizedPageComponent,
        ManagementPageComponent,
        DefaultPageComponent
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
