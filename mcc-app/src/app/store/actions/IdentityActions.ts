import { IdentityRole } from 'src/app/shared/models/entities/IdentityRole';

export class LoginIdentity {
    static readonly type = '[IdentityState] LoginIdentity';
    constructor(public login: string, public password: string) {}
}

export class SetIdentity {
    static readonly type = '[IdentityState] SetIdentity';
    constructor(public token: string, public role: IdentityRole, public id: string = null) {}
}
