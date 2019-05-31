import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';

@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html'
})
export class RestorePasswordComponent {

    constructor(
        store: Store
    ) {
        store.dispatch(new SetNavbarState([], false));
    }

}
