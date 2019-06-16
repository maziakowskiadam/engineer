import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { DoctorsState } from 'src/app/store/states/doctors.state';
import { GetAllDoctors } from 'src/app/store/actions/DoctorsActions';
import { Doctor } from 'src/app/shared/models/entities/Doctor';
import { AddAppointment } from '../../models/AddAppointment';
import * as moment from 'moment';
import { ApiDataService } from 'src/app/shared/services/api-data.service';

@Component({
    selector: 'app-add-appointment',
    templateUrl: './add-appointment.component.html',
    styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {

    date: string;
    doctors: Doctor[] = [];
    selectedDoctor: Doctor;
    timeStart;
    time;
    appCount = 5;
    appointments: AddAppointment[] = [];

    visibleAppointments: AddAppointment[] = [];

    constructor(
        private store: Store,
        private apiDataService: ApiDataService
    ) {
        this.store.dispatch(new GetAllDoctors());
        this.store.select(DoctorsState.doctors)
            .subscribe(doctors => {
                this.doctors = doctors;
                this.selectedDoctor = doctors[0];
            });
    }

    onDateChange(date: string): void {
        this.date = date;

        this.updateVisibleAppointments();
    }

    onDoctorChange(event: any): void {
        const nextSelectedDoctor = this.doctors
            .find(doctor => doctor.id.toString() === event.target.value);
        this.selectedDoctor = nextSelectedDoctor;

        this.updateVisibleAppointments();
    }

    add(): void {
        const nextApps = Array.apply(null, { length: this.appCount })
            .map((_, index) => {
                const startTime = moment(new Date(`${this.date} ${this.timeStart}`))
                    .add(this.time * index, 'minutes');

                return {
                    id: this.appointments.length + index,
                    doctorId: this.selectedDoctor.id,
                    date: this.date,
                    timeStart: startTime.format('HH:mm'),
                    timeEnd: startTime.add(this.time, 'minutes')
                        .format('HH:mm')
                };
            });

        this.appointments = [
            ...this.appointments,
            ...nextApps
        ];

        this.updateVisibleAppointments();
    }


    updateVisibleAppointments(): void {
        const appointments = this.appointments
            .filter(app => app.doctorId === this.selectedDoctor.id
                && app.date === this.date);

        this.visibleAppointments = appointments;
    }

    save(): void {
        this.apiDataService.addAppointments(this.appointments)
            .subscribe(() => {
                alert('Dodano wizyty');
            }, error => {
                alert('Wystąpił błąd');
                console.error(error);
            });
    }

}
