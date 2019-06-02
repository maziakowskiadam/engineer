import { NavbarLink } from 'src/app/shared/layout/models/NavbarLink';

export interface NavbarStateModel {
    navLinks?: NavbarLink[];
    showNavbar: boolean;
}