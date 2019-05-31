import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-results-page',
    templateUrl: './results-page.component.html',
    styleUrls: ['results-page.component.scss']
})
export class ResultsPageComponent {

    constructor(
        private router: Router,
    ) { }

    results: Result[] =
        [
            {
                date: '31.05.2019',
                examType: 'EEG',
                doctor: 'Adam Maziakowski'
            },
            {
                date: '01.06.2019',
                examType: 'EKG',
                doctor: 'Jakub Kubacki'
            },
            {
                date: '02.06.2019',
                examType: 'badanie ogólne',
                doctor: 'Kacper Cygan'
            },
        ]

    provideMore() {
        this.router.navigate(['patients']);
    }
}

export interface Result {
    date?: string;
    examType?: string;
    doctor?: string;
}
