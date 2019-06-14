import { Component } from '@angular/core';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddPatientDto } from 'src/app/shared/models/dtos/AddPatientDto';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    onSubmit(addPatientDto: AddPatientDto): void {
        this.registerService.addPatient(addPatientDto)
            .subscribe(
                () => {
                    this.router.navigate(['../patients-list'], {relativeTo: this.route});
                },
                error => {
                    alert('Nie udało się dodać pacjenta');
                    console.error(error);
                });
    }

    onCancel(): void {
        this.router.navigateByUrl('/management/index');
    }

}
