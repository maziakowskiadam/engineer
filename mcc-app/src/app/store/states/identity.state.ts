import { State, Selector, StateContext, Action } from '@ngxs/store';
import { IdentityStateModel } from '../models/IdentityStateModel';
import { IdentityRole } from 'src/app/shared/models/entities/IdentityRole';
import { LoginIdentity, SetIdentity } from '../actions/IdentityActions';
import { ApiIdentityService } from 'src/app/shared/services/api-identity.service';

@State<IdentityStateModel>({
    name: 'IdentityState',
    defaults: {
        id: null,
        jwt: null,
        role: null
    }
})
export class IdentityState {

    constructor(
        private apiIdentityService: ApiIdentityService
    ) { }

    @Action(LoginIdentity)
    LoginIdentity(ctx: StateContext<IdentityStateModel>, action: LoginIdentity): void {
        const { login, password } = action;
        this.apiIdentityService.login(login, password)
            .subscribe(({ token, role, id }) => {
                ctx.dispatch(new SetIdentity(token, role, id));
            }, () => { // In case of error
                ctx.dispatch(new SetIdentity(null, null));
            });
    }

    @Action(SetIdentity)
    SetIdentity(ctx: StateContext<IdentityStateModel>, action: SetIdentity): void {
        const { token, role, id } = action;
        ctx.patchState({
            ...ctx.getState(),
            jwt: token,
            role,
            id
        });
    }

    @Selector()
    static jwt(state: IdentityStateModel): string {
        return state.jwt;
    }

    @Selector()
    static role(state: IdentityStateModel): IdentityRole {
        return state.role;
    }

    @Selector()
    static id(state: IdentityStateModel): string {
        return state.id;
    }

}
