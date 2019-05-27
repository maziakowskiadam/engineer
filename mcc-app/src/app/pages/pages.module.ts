import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { DoctorsPageComponent } from './doctors-page/doctors-page.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { CommonModule } from '@angular/common';

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
        CommonModule
    ],
    exports: [
        LoginPageComponent,
        DoctorsPageComponent,
        PatientPageComponent,
        UnauthorizedPageComponent,
        ManagementPageComponent,
        DefaultPageComponent
    ]
})
export class PagesModule {}
