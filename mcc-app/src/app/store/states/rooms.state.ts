import { State, Action, StateContext, Selector } from '@ngxs/store';
import { RoomsStateModel } from '../models/RoomsStateModel';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { Room } from 'src/app/shared/models/entities/Room';
import { GetRooms, SetRooms } from '../actions/StateActions';

@State<RoomsStateModel>({
    name: 'RoomsState',
    defaults: {
        rooms: [],
        loading: false
    }
})
export class RoomsState {

    constructor(private apiDataService: ApiDataService) { }

    @Action(GetRooms)
    GetRooms(ctx: StateContext<RoomsStateModel>) {
        ctx.patchState({
            loading: true
        });

        return this.apiDataService.getRooms()
            .subscribe(rooms => {
                ctx.dispatch(new SetRooms(rooms));
            });
    }

    @Action(SetRooms)
    SetRooms(ctx: StateContext<RoomsStateModel>, action: SetRooms) {
        const { rooms } = action;
        const state = ctx.getState();

        ctx.setState({
            ...state,
            loading: false,
            rooms
        });
    }

    @Selector()
    static rooms(state: RoomsStateModel): Room[] {
        return state.rooms;
    }

    @Selector()
    static loading(state: RoomsStateModel): boolean {
        return state.loading;
    }
}