import { IdentityRole } from 'src/app/shared/models/IdentityRole';

export interface IdentityStateModel {
    jwt: string;
    role: IdentityRole;
}
