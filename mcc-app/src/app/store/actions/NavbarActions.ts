import { NavbarLink } from 'src/app/shared/layout/models/NavbarLink';

export class SetNavbarState {
    static readonly type = '[NavbarState] SetNavbarState';
    constructor(public navLinks: NavbarLink[], public showNavbar: boolean) {}
}
