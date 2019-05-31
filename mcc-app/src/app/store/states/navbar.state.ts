import { State } from '@ngxs/store';
import { NavbarStateModel } from '../models/NavbarStateModel';

@State<NavbarStateModel>({
    name: 'NavbarState',
    defaults: {
        navlinks: [],
        showNavbar: true
    }
})
export class NavbarState {

}
