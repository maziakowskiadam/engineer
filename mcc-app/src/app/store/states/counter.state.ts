import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CounterStateModel } from '../models/CounterStateModel';
import { ChangeCounterValue } from '../actions/CounterActions';

@State<CounterStateModel>({
    name: 'CounterState',
    defaults: {
        currentValue: 0
    }
})
export class CounterState {

    @Action(ChangeCounterValue)
    changeCounterValue(context: StateContext<CounterStateModel>, action: ChangeCounterValue): void {
        const { step } = action;
        const state = context.getState();
        context.setState({
            ...state,
            currentValue: state.currentValue + step
        });
    }

    @Selector()
    static counterValue(state: CounterStateModel): number {
        return state.currentValue;
    }

}
