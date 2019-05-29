import { IdentityRole } from 'src/app/models/IdentityRole';

export interface IdentityStateModel {
    jwt: string;
    role: IdentityRole;
}
