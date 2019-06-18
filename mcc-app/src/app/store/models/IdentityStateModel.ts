import { IdentityRole } from 'src/app/shared/models/entities/IdentityRole';

export interface IdentityStateModel {
    id: string;
    jwt: string;
    role: IdentityRole;
}
