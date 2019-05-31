import { NgModule } from '@angular/core';
import { IdentityRoutingModule } from './identity-routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
    declarations: [
        LoginComponent,
        RestorePasswordComponent,
        UnauthorizedComponent
    ],
    imports: [
        CommonModule,
        IdentityRoutingModule
    ]
})
export class IdentityModule {}
