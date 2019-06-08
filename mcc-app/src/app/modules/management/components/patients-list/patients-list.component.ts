import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html'
})
export class PatientsListComponent {

    constructor(
        store: Store
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

}
