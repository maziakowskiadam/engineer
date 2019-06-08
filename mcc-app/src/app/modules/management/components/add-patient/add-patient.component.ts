import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { Patient } from 'src/app/shared/models/Patient';
import { LoginDto } from 'src/app/shared/models/LoginDto';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {

    patientIdentity: LoginDto = {
        email: '',
        password: ''
    };

    patient: Patient = {
        firstName: '',
        lastName: '',
        pesel: '',
        gender: 'M',
        street: '',
        house: '',
        zipcode: '',
        city: '',
    };

    gender = {
        male: true,
        female: false
    };

    constructor(
        store: Store,
        private registerService: RegisterService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

    onSubmit(): void {
        this.registerService.addPatient({
            identity: this.patientIdentity,
            patient: this.patient
        }).subscribe(() => {
            this.router.navigate(['../patients-list'], {relativeTo: this.route});
        }, error => {
            alert('Nie udało się dodać pacjenta');
            console.error(error);
        });
    }

    onGenderChange(gender: string): void {
        this.patient.gender = gender;
    }

}
