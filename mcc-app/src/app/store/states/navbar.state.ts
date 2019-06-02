import { State, Selector, Action, StateContext } from '@ngxs/store';
import { NavbarStateModel } from '../models/NavbarStateModel';
import { NavbarLink } from 'src/app/shared/layout/models/NavbarLink';
import { SetNavbarState } from '../actions/NavbarActions';

@State<NavbarStateModel>({
    name: 'NavbarState',
    defaults: {
        navLinks: [],
        showNavbar: true
    }
})
export class NavbarState {

    @Selector()
    static navLinks(state: NavbarStateModel): NavbarLink[] {
        return state.navLinks;
    }

    @Selector()
    static showNavbar(state: NavbarStateModel): boolean {
        return state.showNavbar;
    }

    @Action(SetNavbarState)
    SetNavbarState(ctx: StateContext<NavbarStateModel>, action: SetNavbarState): void {
        const { navLinks, showNavbar } = action;
        ctx.patchState({
            navLinks,
            showNavbar
        });
    }

}
