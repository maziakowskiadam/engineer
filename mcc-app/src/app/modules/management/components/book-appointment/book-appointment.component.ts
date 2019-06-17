import { Component, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/shared/models/entities/Doctor';
import { Store } from '@ngxs/store';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { Appointment } from 'src/app/_old_pages/appointments-page/appointments-page.component';
import { GetAllAppointments } from 'src/app/store/actions/AppointmentsActions';
import { AppointmentsState } from 'src/app/store/states/appointments.state';

@Component({
    selector: 'app-book-appointment',
    templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnDestroy {

    doctors: Doctor[] = [];
    loading: boolean;

    selectedDoctor: Doctor;
    selectedDate: string;

    onDestroy$: Subject<void> = new Subject();

    appointments: Appointment[];
    visibleAppointments: Appointment[];

    constructor(
        private store: Store
    ) {
        window['book'] = this;

        this.store.dispatch(new GetAllDoctors());
        this.store.dispatch(new GetAllAppointments());

        const doctors$ = this.store.select(DoctorsState.doctors);
        const loadingDoctors$ = this.store.select(DoctorsState.loading);

        const appointments$ = this.store.select(AppointmentsState.appointments);
        const loadingAppointments$ = this.store.select(AppointmentsState.loading);

        combineLatest(doctors$, loadingDoctors$, appointments$, loadingAppointments$)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(([
                doctors,
                loadingDoctors,
                appointments,
                loadingAppointments
            ]) => {
                this.doctors = doctors;
                this.appointments = appointments;
                this.loading = loadingDoctors || loadingAppointments;

                this.selectedDoctor = doctors[0];
            });

    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    onSelectedDoctorChange(doctorId: string): void {
        this.selectedDoctor = this.doctors.find(d => d.id.toString() === doctorId);
        this.updateAppointments();
    }

    onSelectedDateChange(date: string): void {
        this.selectedDate = date;
        this.updateAppointments();
    }

    private updateAppointments(): void {
        if (!this.selectedDoctor || !this.selectedDate || !this.appointments) {
            return;
        }

        this.visibleAppointments = this.appointments
            .filter(appointment => appointment.date === this.selectedDate
                && appointment.doctor === `${this.selectedDoctor.firstName} ${this.selectedDoctor.lastName}`);

        // if (appointments)
        console.log(this);
    }


}
