import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';

@Component({
    selector: 'app-management-index',
    templateUrl: './management-index.component.html'
})
export class ManagementIndexComponent {

    constructor(
        store: Store
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

}
