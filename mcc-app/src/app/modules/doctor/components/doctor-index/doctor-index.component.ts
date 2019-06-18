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

@Component({
    selector: 'app-doctor-index',
    templateUrl: './doctor-index.component.html'
})
export class DoctorIndexComponent implements OnDestroy {

    appointments: AppointmentListItem[];
    loading: boolean;

    onDestroy$: Subject<void> = new Subject();

    constructor(store: Store) {
        store.dispatch([
            new GetAppointments(),
            new GetPatients(),
            new GetRooms()
        ]);

        const appointments$ = store.select(AppointmentsState.appointments);
        const loading$ = store.select(AppointmentsState.loading);
        const patients$ = store.select(PatientsState.patients);
        const rooms$ = store.select(RoomsState.rooms);

        combineLatest(
            loading$,
            appointments$,
            patients$,
            rooms$
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(
                ([
                    loading,
                    appointments,
                    patients,
                    rooms
                ]) => {
                    this.loading = loading;
                    if (loading) {
                        return;
                    }

                    this.appointments = appointments.filter(appointment => appointment.doctorId === 1
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
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

}
