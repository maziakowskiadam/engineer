export interface NavbarLink {
    path: string;
    name: string;

    children?: NavbarLink[];
}
