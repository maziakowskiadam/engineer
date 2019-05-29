import { IdentityRole } from './IdentityRole';

export interface Login {
    token: string;
    role: IdentityRole;
}
