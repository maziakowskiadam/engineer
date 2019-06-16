import { AppointmentsStateModel } from '../models/AppointmentsStateModel';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { GetAppointments, SetAppointments } from '../actions/StateActions';
import { Appointment } from 'src/app/shared/models/entities/Appointment';


@State<AppointmentsStateModel>({
    name: 'AppointmentsState',
    defaults: {
        appointments: [],
        loading: false
    }
})
export class AppointmentsState {

    constructor(private apiDataService: ApiDataService) { }

    @Action(GetAppointments)
    GetAppointments(ctx: StateContext<AppointmentsStateModel>) {
        ctx.patchState({
            loading: true
        });

        return this.apiDataService.getAppointments('d0325d96-5ef4-46dd-bdea-8638718217ee')
            .subscribe(appointments => {
                ctx.dispatch(new SetAppointments(appointments));
            });
    }

    @Action(SetAppointments)
    SetAppointments(ctx: StateContext<AppointmentsStateModel>, action: SetAppointments) {
        const { appointments } = action;
        const state = ctx.getState();

        ctx.setState({
            ...state,
            loading: false,
            appointments
        });
    }

    @Selector()
    static appointments(state: AppointmentsStateModel): Appointment[] {
        return state.appointments;
    }

    @Selector()
    static loading(state: AppointmentsStateModel): boolean {
        return state.loading;
    }
}
