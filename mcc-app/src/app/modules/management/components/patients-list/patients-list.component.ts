import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { GetPatients } from 'src/app/store/actions/StateActions';
import { Patient } from 'src/app/shared/models/entities/Patient';
import { PatientsState } from 'src/app/store/states/patients.state';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html'
})
export class PatientsListComponent implements OnDestroy {

    patients: Patient[];
    loading: boolean;

    onDestroy$: Subject<void> = new Subject();

    constructor(store: Store) {
        store.dispatch(new GetPatients());

        store.select(PatientsState.patients)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(patients => this.patients = patients);

        store.select(PatientsState.loading)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(loading => this.loading = loading);
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

}
