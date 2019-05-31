import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsPageComponent } from './components/account-settings/account-settings.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'settings'
    },
    {
        path: 'settings',
        component: AccountSettingsPageComponent
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
export class AccountRoutingModule {}
