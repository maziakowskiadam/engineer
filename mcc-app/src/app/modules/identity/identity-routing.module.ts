import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'restore',
        component: RestorePasswordComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    { 
        path: 'register',
        component: RegisterComponent
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
export class IdentityRoutingModule {}