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
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { ActivatedRoute } from '@angular/router';

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

    appointments: Appointment[] = [];
    visibleAppointments: Appointment[] = [];

    patientId: number;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private apiDataService: ApiDataService
    ) {
        window['book'] = this;

        this.patientId = parseFloat(this.route.snapshot.paramMap.get('patientId'));

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
                && appointment.doctorId === this.selectedDoctor.id)
            .filter(appointment => !appointment.patientId);
    }

    book(appointmenId: number): void {
        this.apiDataService.bookAppointment(appointmenId, this.patientId)
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
