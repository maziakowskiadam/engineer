import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-doctor-page',
    templateUrl: './add-doctor-page.component.html',
    styleUrls: ['./add-doctor-page.component.scss']
})
export class AddDoctorPageComponent {

    constructor(
        private router: Router,
    ) { }

    goToManagement() {
        this.router.navigate(['management']);
    }
}
