import { Component } from '@angular/core';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    constructor(
        store: Store
    ) {
        store.dispatch(new SetNavbarState([], false));
    }

}
