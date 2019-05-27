import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CounterState } from './store/states/counter.state';
import { ChangeCounterValue } from './store/actions/CounterActions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'mcc-app';

    counterValue: number;

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.select(CounterState.counterValue)
            .subscribe(counterValue => {
                this.counterValue = counterValue;

                console.log(`Value changed ${counterValue}`);
            });
    }

    changeCounter(step: number): void {
        this.store.dispatch(new ChangeCounterValue(step));
    }

}
