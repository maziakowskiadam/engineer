import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { Doctor } from 'src/app/models/Doctor';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-management-page',
    templateUrl: './management-page.component.html',
    styleUrls: ['./management-page.component.scss']
})
export class ManagementPageComponent implements OnInit {

    loading: boolean;
    doctors: Doctor[];

    constructor(
        private store: Store,
        private router: Router, ) {
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

    gotoAddDoctor() {
        this.router.navigate(['add-doctor']);
    }

    gotoAddRoom() {
        this.router.navigate(['add-room']);
    }

    gotoAddPatient() {
        this.router.navigate(['add-patient']);
    }

    gotoActivateAccount() {
        this.router.navigate(['activate-account']);
    }

    gotoAddAppointment() {
        this.router.navigate(['add-appointment']);
    }

    gotoAddExamType() {
        this.router.navigate(['add-exam-type']);
    }

}
