import { State, StateContext, Action, Selector } from '@ngxs/store';
import { PatientsStateModel } from '../models/PatientsStateModel';
import { GetPatients, SetPatients } from '../actions/StateActions';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { Patient } from 'src/app/shared/models/entities/Patient';

@State<PatientsStateModel>({
    name: 'PatientsState',
    defaults: {
        patients: [],
        loading: false
    }
})
export class PatientsState {

    constructor(private apiDataService: ApiDataService) { }

    @Action(GetPatients)
    GetPatients(ctx: StateContext<PatientsStateModel>) {
        ctx.patchState({
            loading: true
        });

        return this.apiDataService.getPatients()
            .subscribe(patients => {
                ctx.dispatch(new SetPatients(patients));
            });
    }

    @Action(SetPatients)
    SetPatients(ctx: StateContext<PatientsStateModel>, action: SetPatients) {
        const { patients } = action;
        const state = ctx.getState();

        ctx.setState({
            ...state,
            loading: false,
            patients
        });
    }

    @Selector()
    static patients(state: PatientsStateModel): Patient[] {
        return state.patients;
    }

    @Selector()
    static loading(state: PatientsStateModel): boolean {
        return state.loading;
    }


}

