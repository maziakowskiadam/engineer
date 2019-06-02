import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';
import { ApiDataService } from 'src/app/shared/services/api-data.service';

@Component({
    selector: 'app-add-doctor',
    templateUrl: './add-doctor.component.html',
    styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {

    firstName: string;
    lastName: string;
    specialization: string;

    constructor(
        store: Store,
        private apiDataService: ApiDataService
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

    onSubmit(): void {
        this.apiDataService.addDoctor({
            firstName: this.firstName,
            lastName: this.lastName,
            specialization: this.specialization
        }).subscribe(result => {
            console.log(result);
        });
    }

}
