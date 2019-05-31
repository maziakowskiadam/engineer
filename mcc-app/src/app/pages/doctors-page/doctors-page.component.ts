import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-doctors-page',
    templateUrl: './doctors-page.component.html',
    styleUrls: ['./doctors-page.component.scss']
})
export class DoctorsPageComponent {

    constructor(
        private router: Router,
    ) { }

    goToNewAppointment() {
        this.router.navigate(['new-appointment']);
    }

    goToResults() {
        this.router.navigate(['results']);
    }

}
