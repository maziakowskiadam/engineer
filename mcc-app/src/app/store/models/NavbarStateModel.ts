import { NavbarLink } from 'src/app/layout/models/NavbarLink';

export interface NavbarStateModel {
    navLinks?: NavbarLink[];
    showNavbar: boolean;
}