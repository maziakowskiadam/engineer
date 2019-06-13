import { IdentityRole } from 'src/app/shared/models/entities/IdentityRole';

export interface IdentityStateModel {
    jwt: string;
    role: IdentityRole;
}
