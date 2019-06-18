import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/models/entities/Result';
import { GetAllResults } from 'src/app/store/actions/ResultsActions';
import { GetAppointments } from 'src/app/store/actions/AppointmentsActions';
import { Store } from '@ngxs/store';
import { ResultsState } from 'src/app/store/states/results.state';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-patient-results',
    templateUrl: './patient-results.component.html',
    // styleUrls: ['./patient-results.component.scss']
})
export class PatientResultsComponent implements OnInit {

    results: Result[];
    loading: boolean;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.store.dispatch(new GetAllResults());
    }

    ngOnInit(): void {
        const results$ = this.store.select(ResultsState.results);
        const loading$ = this.store.select(ResultsState.loading);

        combineLatest(
            results$,
            loading$
        ).subscribe(([
            results,
            loading
        ]) => {
            const appointmentId = this.route.snapshot.paramMap.get('appointmentId');
            this.results = results.filter(r => r.appointmentId === +appointmentId);
            this.loading = loading;
        });
    }
}
