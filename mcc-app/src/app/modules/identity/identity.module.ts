import { NgModule } from '@angular/core';
import { IdentityRoutingModule } from './identity-routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoginComponent,
        RestorePasswordComponent,
        UnauthorizedComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IdentityRoutingModule
    ]
})
export class IdentityModule {}
