import { Component } from '@angular/core';

@Component({
    selector: 'app-add-appointment-page',
    templateUrl: './add-appointment-page.component.html',
    styleUrls: ['./add-appointment-page.component.scss']
})
export class AddAppointmentPageComponent {


    appTimes: string[] = ['9:00', '9:15', '9:30', '9:45', '10:00'];
    doctors: string[] = ['Adam Maziakowski', 'Jakub Kubacki', 'Kacper Cygan'];
    examinationTypes: string[] = ['EEG', 'EKG', 'Badanie ogólne'];
}
