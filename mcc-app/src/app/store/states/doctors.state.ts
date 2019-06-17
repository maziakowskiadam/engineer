import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DoctorsStateModel } from '../models/DoctorsStateModel';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { GetAllDoctors, SetDoctors } from '../actions/DoctorsActions';
import { Doctor } from 'src/app/shared/models/entities/Doctor';

@State<DoctorsStateModel>({
    defaults: {
        doctors: undefined,
        loading: false
    },
    name: 'DoctorsState'
})
export class DoctorsState {

    constructor(
        private apiDataService: ApiDataService
    ) { }

    @Action(GetAllDoctors)
    getAllDoctors(ctx: StateContext<DoctorsStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            loading: true
        });

        return this.apiDataService.getDoctors()
            .subscribe(doctors => {
                ctx.dispatch(new SetDoctors(doctors));
            });
    }

    @Action(SetDoctors)
    setDoctors(ctx: StateContext<DoctorsStateModel>, action: SetDoctors) {
        const { doctors } = action;
        const state = ctx.getState();
        ctx.setState({
            ...state,
            doctors,
            loading: false
        });
    }

    @Selector()
    static doctors(state: DoctorsStateModel): Doctor[] {
        return state.doctors;
    }

    @Selector()
    static loading(state: DoctorsStateModel): boolean {
        return state.loading;
    }

}
