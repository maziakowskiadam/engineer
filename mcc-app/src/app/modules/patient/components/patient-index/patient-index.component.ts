import { Component, OnDestroy } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetAppointments } from 'src/app/store/actions/AppointmentsActions';
import { PatientAppointmentListItem } from '../../models/PatientAppointmentListItem';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { takeUntil } from 'rxjs/operators';
import { IdentityState } from 'src/app/store/states/identity.state';
import { PatientsState } from 'src/app/store/states/patients.state';

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
        const patients$ = store.select(PatientsState.patients);
        const identityId$ = store.select(IdentityState.id);

        combineLatest(
            loading$,
            appointments$,
            doctors$,
            patients$,
            identityId$
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                ([
                    loading,
                    appointments,
                    doctors,
                    patients,
                    identityId
                ]) => {
                    this.loading = loading;
                    if (this.loading) {
                        return;
                    }

                    const patient = patients.find(p => p.identityId === identityId);
                    if (!patient) {
                        return;
                    }


                    this.appointments = appointments.filter(appointment => appointment.patientId === patient.id
                        && appointment.done === false)
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



        combineLatest(
            loading$,
            appointments$,
            doctors$,
            patients$,
            identityId$
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                ([
                    loading,
                    appointmentsDone,
                    doctors,
                    patients,
                    identityId
                ]) => {
                    this.loading = loading;
                    if (this.loading) {
                        return;
                    }

                    const patient = patients.find(p => p.identityId === identityId);
                    if (!patient) {
                        return;
                    }

                    this.appointmentsDone = appointmentsDone.filter(appointment => appointment.done === true &&
                        appointment.patientId === patient.id)
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
