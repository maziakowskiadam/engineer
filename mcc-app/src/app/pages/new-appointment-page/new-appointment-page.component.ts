import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-appointment-page',
    templateUrl: './new-appointment-page.component.html',
    styleUrls: ['new-appointment-page.component.scss']
})
export class NewAppointmentPageComponent {

    currentPatient: CurrentPatient =
        {
            firstName: 'Adam',
            lastName: 'Maziakowski',
            dateOfBirth: '08.12.1995'
        }

    currentAppointment: CurrentAppointment =
        {
            examType: 'EEG',
            room: '21B',
            date: '21.06.2019'
        }

    constructor(
        private router: Router,
    ) { }

    finishAppointment() {
        this.router.navigate(['doctors']);
    }




}

export interface CurrentPatient {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
}

export interface CurrentAppointment {
    date?: string;
    examType?: string;
    room?: string;
}
