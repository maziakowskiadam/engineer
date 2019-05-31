import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-appointments-page',
    templateUrl: './appointments-page.component.html',
    styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    appointments: Appointment[] =
        [
            {
                date: '31.05.2019',
                time: '16:00',
                doctor: 'Adam Maziakowski',
                examType: 'badanie ogólne',
                room: '21B'
            },
            {
                date: '01.06.2019',
                time: '11:00',
                doctor: 'Jakub Kubacki',
                examType: 'EEG',
                room: '21B'
            },
            {
                date: '02.06.2019',
                time: '13:00',
                doctor: 'Kacper Cygan',
                examType: 'EKG',
                room: '21B'
            },
        ]
        ;

    ngOnInit() { }

    cancelAppointment() {
        this.router.navigate(['patients']);
    }
}

export interface Appointment {
    date?: string;
    time?: string;
    doctor?: string;
    examType?: string;
    room?: string;
}
