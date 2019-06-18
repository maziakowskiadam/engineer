import { Component } from '@angular/core';
import { Result } from 'src/app/shared/models/entities/Result';
import { GetAllResults } from 'src/app/store/actions/ResultsActions';
import { GetAppointments } from 'src/app/store/actions/AppointmentsActions';
import { Store } from '@ngxs/store';
import { ResultsState } from 'src/app/store/states/results.state';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-patient-results',
    templateUrl: './patient-results.component.html',
    // styleUrls: ['./patient-results.component.scss']
})
export class PatientResultsComponent {

    results: Result[];
    loading: boolean;

    // napisać tak, jak doctors-list
}
