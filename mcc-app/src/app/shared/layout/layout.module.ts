import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { ManagementNavbarComponent } from './management-navbar/management-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        NavbarComponent,
        ManagementNavbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class LayoutModule {}
