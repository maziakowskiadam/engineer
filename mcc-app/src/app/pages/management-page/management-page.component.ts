import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { Doctor } from 'src/app/models/Doctor';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-management-page',
    templateUrl: './management-page.component.html',
    styleUrls: ['./management-page.component.scss']
})
export class ManagementPageComponent implements OnInit {

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
