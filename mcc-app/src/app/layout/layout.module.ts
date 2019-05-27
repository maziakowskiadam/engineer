import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        NgbModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class LayoutModule {}
