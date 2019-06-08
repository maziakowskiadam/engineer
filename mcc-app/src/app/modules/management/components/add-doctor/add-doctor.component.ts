import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddDoctorDto } from 'src/app/shared/models/AddDoctorDto';

@Component({
    selector: 'app-add-doctor',
    templateUrl: './add-doctor.component.html',
    styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {


    doctor: AddDoctorDto = {
        firstName: '',
        lastName: '',
        specialization: ''
    };


    constructor(
        store: Store,
        private apiDataService: ApiDataService
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

    onSubmit(): void {
        this.apiDataService.addDoctor(this.doctor)
            .subscribe(
                (result) => {
                    console.log(result);
                    this.doctor.firstName = '';
                    this.doctor.lastName = '';
                    this.doctor.specialization = '';
                },
                () => {
                    console.log('Error');
                }
            );
    }

}

