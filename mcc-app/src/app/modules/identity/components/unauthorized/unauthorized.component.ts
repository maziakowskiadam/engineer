import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent {

    constructor(
        store: Store
    ) {
        store.dispatch(new SetNavbarState([], false));
    }

}
