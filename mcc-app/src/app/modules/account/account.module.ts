import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { AccountSettingsPageComponent } from './components/account-settings/account-settings.component';

@NgModule({
    declarations: [
        AccountSettingsPageComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule
    ]
})
export class AccountModule {}
