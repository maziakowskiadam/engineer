import { Component, OnDestroy } from '@angular/core';
import { Appointment } from 'src/app/shared/models/entities/Appointment';
import { Subject, combineLatest } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetPatients, GetRooms } from 'src/app/store/actions/StateActions';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { takeUntil } from 'rxjs/operators';
import { PatientsState } from 'src/app/store/states/patients.state';
import { AppointmentListItem } from '../../models/AppointmentListItem';
import { RoomsState } from 'src/app/store/states/rooms.state';
import { GetAppointments } from 'src/app/store/actions/AppointmentsActions';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { IdentityState } from 'src/app/store/states/identity.state';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';

@Component({
    selector: 'app-doctor-index',
    templateUrl: './doctor-index.component.html'
})
export class DoctorIndexComponent implements OnDestroy {

    appointments: AppointmentListItem[];
    appointmentsDone: AppointmentListItem[];
    loading: boolean;

    onDestroy$: Subject<void> = new Subject();

    constructor(store: Store) {
        store.dispatch([
            new GetAppointments(),
            new GetPatients(),
            new GetRooms(),
            new GetAllDoctors()
        ]);

        const appointments$ = store.select(AppointmentsState.appointments);
        const loading$ = store.select(AppointmentsState.loading);
        const patients$ = store.select(PatientsState.patients);
        const doctors$ = store.select(DoctorsState.doctors);
        const rooms$ = store.select(RoomsState.rooms);
        const identityId$ = store.select(IdentityState.id);

        combineLatest(
            loading$,
            appointments$,
            patients$,
            rooms$,
            doctors$,
            identityId$
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                ([
                    loading,
                    appointments,
                    patients,
                    rooms,
                    doctors,
                    identityId
                ]) => {
                    this.loading = loading;
                    if (loading) {
                        return;
                    }

                    const doctor = doctors.find(d => d.identityId === identityId);
                    if (!doctor) {
                        return;
                    }

                    this.appointments = appointments.filter(appointment => appointment.doctorId === doctor.id
                        && appointment.done === false).map(appointment => {
                            const patient = patients.find(p => p.id === appointment.patientId);
                            const room = rooms.find(r => r.id === appointment.roomId);
                            return {
                                id: appointment.id,
                                patient: patient ? `${patient.firstName} ${patient.lastName}` : '-',
                                room: room ? `${room.number}` : '-',
                                timeStart: appointment.time,
                                date: appointment.date,
                            };
                        });
                });

        combineLatest(
            loading$,
            appointments$,
            patients$
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                ([
                    loading,
                    appointmentsDone,
                    patients,
                ]) => {
                    this.loading = loading;
                    if (this.loading) {
                        return;
                    }
                    this.appointmentsDone = appointmentsDone.filter(appointment => appointment.done === true)
                        .map(appointment => {
                            const patient = patients.find(x => x.id === appointment.patientId);
                            return {
                                id: appointment.id,
                                patient: patient ? `${patient.firstName} ${patient.lastName}` : '-',
                                room: '-',
                                timeStart: appointment.time,
                                date: appointment.date,
                            };
                        }).reverse();
                }
            );
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

}
