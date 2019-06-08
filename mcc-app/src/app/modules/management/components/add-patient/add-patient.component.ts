import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { Patient } from 'src/app/shared/models/Patient';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {

    patientIdentity = {
        email: '',
        password: ''
    };

    patient: Patient = {
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


        window['add'] = this;
    }

    onSubmit(): void {
        // this.apiDataService.addPatient(this.patient)
        //     .subscribe(result => {
        //         console.log(result);
        //     });
        // this.patient.firstName = '';
        // this.patient.lastName = '';
        // this.patient.pesel = '';
        // this.patient.gender = '';
        // this.patient.street = '';
        // this.patient.house = '';
        // this.patient.zipcode = '';
        // this.patient.city = '';
    }


}
