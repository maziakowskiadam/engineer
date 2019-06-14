import { Component } from '@angular/core';
import { AddPatientDto } from 'src/app/shared/models/dtos/AddPatientDto';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    constructor(
        private registerService: RegisterService,
        private router: Router
    ) {}

    onSubmit(patient: AddPatientDto): void {
        this.registerService.addPatientUnauthorized(patient)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/');
                },
                error => {
                    alert('Wystąpił błąd');
                    console.error(error);
                });
    }

    onCancel(): void {
        this.router.navigateByUrl('/');
    }

}
