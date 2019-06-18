import { Component, OnDestroy } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { Appointment } from 'src/app/_old_pages/appointments-page/appointments-page.component';
import { Doctor } from 'src/app/shared/models/entities/Doctor';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { GetAllAppointments } from 'src/app/store/actions/AppointmentsActions';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { takeUntil } from 'rxjs/operators';
import { IdentityState } from 'src/app/store/states/identity.state';
import { GetPatients } from 'src/app/store/actions/StateActions';
import { PatientsState } from 'src/app/store/states/patients.state';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html'
})
export class BookComponent implements OnDestroy {

    doctors: Doctor[] = [];
    loading: boolean;

    selectedDoctor: Doctor;
    selectedDate: string;

    onDestroy$: Subject<void> = new Subject();

    appointments: Appointment[] = [];
    visibleAppointments: Appointment[] = [];

    patientID: number;

    constructor(
        // private route: ActivatedRoute,
        private store: Store,
        private apiDataService: ApiDataService
    ) {
        this.store.dispatch(new GetAllDoctors());
        this.store.dispatch(new GetAllAppointments());
        this.store.dispatch(new GetPatients());

        const doctors$ = this.store.select(DoctorsState.doctors);
        const loadingDoctors$ = this.store.select(DoctorsState.loading);

        const appointments$ = this.store.select(AppointmentsState.appointments);
        const loadingAppointments$ = this.store.select(AppointmentsState.loading);

        const patients$ = this.store.select(PatientsState.patients);
        const identityId$ = this.store.select(IdentityState.id);

        combineLatest(doctors$, loadingDoctors$, appointments$, loadingAppointments$, patients$, identityId$)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(([
                doctors,
                loadingDoctors,
                appointments,
                loadingAppointments,
                patients,
                identityId
            ]) => {
                this.doctors = doctors;
                this.appointments = appointments;
                this.loading = loadingDoctors || loadingAppointments;

                const patient = patients.find(p => p.identityId === identityId);
                if (patient) {
                    this.patientID = patient.id;
                }

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
                && appointment.doctorId === this.selectedDoctor.id)
            .filter(appointment => !appointment.patientId);
    }

    book(appointmenId: number): void {
        this.apiDataService.bookAppointment(appointmenId, this.patientID)
            .subscribe(() => {
                alert('Dodano wizytę');
                this.store.dispatch(new GetAllDoctors());
                this.store.dispatch(new GetAllAppointments());
            }, error => {
                alert('Wystąpił błąd');
                console.error(error);
            });
    }

}
