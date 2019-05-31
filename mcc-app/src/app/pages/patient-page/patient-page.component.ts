import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-patient-page',
    templateUrl: './patient-page.component.html',
    styleUrls: ['patient-page.component.scss']
})
export class PatientPageComponent {

    constructor(
        private router: Router,
    ) { }

    goToAddAppointment() {
        this.router.navigate(['add-appointment']);
    }

    goToAppointments() {
        this.router.navigate(['appointments']);
    }

    goToResults() {
        this.router.navigate(['results']);
    }

    goToAccountSettings() {
        this.router.navigate(['account-settings']);
    }
}
