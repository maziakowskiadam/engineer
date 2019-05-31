import { NavbarLink } from 'src/app/layout/models/NavbarLink';

export interface NavbarStateModel {
    navlinks?: NavbarLink[];
    showNavbar: boolean;
}