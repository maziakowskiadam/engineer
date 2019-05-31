import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-appointment-page',
    templateUrl: './add-appointment-page.component.html',
    styleUrls: ['./add-appointment-page.component.scss']
})
export class AddAppointmentPageComponent {

    constructor(
        private router: Router,
    ) { }

    appTimes: string[] = ['9:00', '9:15', '9:30', '9:45', '10:00'];
    doctors: string[] = ['Adam Maziakowski', 'Jakub Kubacki', 'Kacper Cygan'];
    examinationTypes: string[] = ['EEG', 'EKG', 'Badanie ogólne'];

    addAppointment() {
        this.router.navigate(['patients'])
    }
}
