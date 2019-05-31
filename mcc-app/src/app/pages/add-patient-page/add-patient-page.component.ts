import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-patient-page',
    templateUrl: './add-patient-page.component.html',
    styleUrls: ['./add-patient-page.component.scss']
})
export class AddPatientPageComponent {
    constructor(
        private router: Router,
    ) { }

    addPatient() {
        this.router.navigate(['management']); // tak raczej nie może zostać
    }

}
