import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        NgbModule,
        CommonModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class LayoutModule {}
