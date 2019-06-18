import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ResultsStateModel } from '../models/ResultsStateModel';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { GetAllResults, SetResults } from '../actions/ResultsActions';
import { Result } from 'src/app/shared/models/entities/Result';




@State<ResultsStateModel>({
    name: 'ResultsState',
    defaults: {
        results: [],
        loading: false
    },
})
export class ResultsState {

    constructor(
        private apiDataService: ApiDataService
    ) { }

    @Action(GetAllResults)
    getAllResults(ctx: StateContext<ResultsStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            loading: true
        });

        return this.apiDataService.getResults()
            .subscribe(results => {
                ctx.dispatch(new SetResults(results));
            });
    }

    @Action(SetResults)
    setResults(ctx: StateContext<ResultsStateModel>, action: SetResults) {
        const { results } = action;
        const state = ctx.getState();
        ctx.setState({
            ...state,
            results,
            loading: false
        });
    }

    @Selector()
    static results(state: ResultsStateModel): Result[] {
        return state.results;
    }

    @Selector()
    static loading(state: ResultsStateModel): boolean {
        return state.loading;
    }

}
