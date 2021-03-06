export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    pesel: string;
    gender: string;
    street: string;
    house: string;
    zipcode: string;
    city: string;

    identityId?: string;
    role?: string;
}
