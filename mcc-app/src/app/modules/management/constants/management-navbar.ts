import { NavbarLink } from 'src/app/shared/layout/models/NavbarLink';

export const MANAGEMENT_NAV_LINKS: NavbarLink[] = [
    {
        name: 'Home',
        path: 'management/index'
    },
    {
        name: 'Dodaj lekarza',
        path: 'management/add-doctor'
    },
    {
        name: 'Lista lekarzy',
        path: 'management/doctors-list'
    },
    {
        name: 'Dodaj gabinet',
        path: 'management/add-room'
    },
    {
        name: 'Dodaj rodzaj badania',
        path: 'management/add-examination-type'
    },
    {
        name: 'Dodaj pacjenta',
        path: 'management/add-patient'
    },

];
