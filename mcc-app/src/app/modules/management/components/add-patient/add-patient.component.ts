import { Component } from '@angular/core';
import { AddPatientDto } from 'src/app/shared/models/AddPatientDto';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {

    patient: AddPatientDto = {
        firstName: '',
        lastName: '',
        pesel: '',
        gender: '',
        street: '',
        house: '',
        zipcode: '',
        city: '',
    };

    constructor(
        store: Store,
        private apiDataService: ApiDataService
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

    onSubmit(): void {
        this.apiDataService.addPatient(this.patient)
            .subscribe(result => {
                console.log(result);
            });
        this.patient.firstName = '';
        this.patient.lastName = '';
        this.patient.pesel = '';
        this.patient.gender = '';
        this.patient.street = '';
        this.patient.house = '';
        this.patient.zipcode = '';
        this.patient.city = '';
    }


}
