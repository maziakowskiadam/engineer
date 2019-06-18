import { Component, OnDestroy } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetAppointments } from 'src/app/store/actions/AppointmentsActions';
import { PatientAppointmentListItem } from '../../models/PatientAppointmentListItem';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-patient-index',
    templateUrl: './patient-index.component.html',
    styleUrls: ['./patient-index.component.scss']
})
export class PatientIndexComponent {

    appointments: PatientAppointmentListItem[];
    appointmentsDone: PatientAppointmentListItem[];
    loading: boolean;

    onDestroy$: Subject<void> = new Subject();

    constructor(store: Store) {
        store.dispatch([
            new GetAppointments(),
            new GetAllDoctors(),
        ]);

        const loading$ = store.select(AppointmentsState.loading);
        const appointments$ = store.select(AppointmentsState.appointments);
        const doctors$ = store.select(DoctorsState.doctors);

        combineLatest(
            loading$,
            appointments$,
            doctors$
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                ([
                    loading,
                    appointments,
                    doctors,
                ]) => {
                    this.loading = loading;
                    if (this.loading) {
                        return;
                    }
                    this.appointments = appointments.filter(appointment => appointment.patientId === 1)
                        .map(appointment => {
                            const doctor = doctors.find(d => d.id === appointment.doctorId);
                            return {
                                id: appointment.id,
                                date: appointment.date,
                                timeStart: appointment.time,
                                doctor: doctor ? `${doctor.firstName} ${doctor.lastName}` : '-'
                            };
                        }).reverse();
                }
            );
    }
}
