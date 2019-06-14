import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { LoginDto } from 'src/app/shared/models/dtos/LoginDto';
import { Doctor } from 'src/app/shared/models/entities/Doctor';
import { RegisterService } from 'src/app/shared/services/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-add-doctor',
    templateUrl: './add-doctor.component.html',
    styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {

    doctorIdentity: LoginDto = {
        email: '',
        password: ''
    };

    doctor: Doctor = {
        firstName: '',
        lastName: '',
        specialization: ''
    };

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    onSubmit(): void {
        this.registerService.addDoctor({
            identity: this.doctorIdentity,
            doctor: this.doctor
        }).subscribe(() => {
            this.router.navigate(['../doctors-list'], { relativeTo: this.route });
        }, error => {
            alert('Nie udało się dodać lekarza');
            console.error(error);
        });
    }

}

