import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DoctorsStateModel } from '../models/DoctorsStateModel';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { GetAllDoctors } from '../actions/DoctorsActions';
import { Doctor } from 'src/app/shared/models/Doctor';

@State<DoctorsStateModel>({
    defaults: {
        doctors: [],
        loading: false
    },
    name: 'DoctorsState'
})
export class DoctorsState {

    constructor(
        private apiDataService: ApiDataService
    ) { }

    @Action(GetAllDoctors)
    getAllDoctors(ctx: StateContext<DoctorsStateModel>): void {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            doctors: [],
            loading: true
        });

        this.apiDataService.getDoctors()
            .subscribe(doctors => {
                ctx.setState({
                    ...state,
                    doctors,
                    loading: false
                });
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
