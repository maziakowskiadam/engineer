import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/entities/Doctor';
import { Store } from '@ngxs/store';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-doctors-list',
    templateUrl: 'doctors-list.component.html',
    styleUrls: ['doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {

    loading: boolean;
    doctors: Doctor[];

    constructor(private store: Store) {
        this.store.dispatch(new GetAllDoctors());
    }

    ngOnInit() {
        const doctors$ = this.store.select(DoctorsState.doctors);
        const loading$ = this.store.select(DoctorsState.loading);

        combineLatest(
            doctors$,
            loading$
        ).subscribe(([
            doctors,
            loading
        ]) => {
            this.loading = loading;
            this.doctors = doctors;
        });
    }
}
