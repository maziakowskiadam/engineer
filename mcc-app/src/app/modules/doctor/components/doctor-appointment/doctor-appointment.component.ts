import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppointmentsState } from 'src/app/store/states/appointments.state';
import { Appointment } from 'src/app/shared/models/entities/Appointment';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { Result } from 'src/app/shared/models/entities/Result';

@Component({
    selector: 'app-appointment-index',
    templateUrl: './doctor-appointment.component.html'
})
export class DoctorAppointmentComponent implements OnInit {

    appointment: Appointment;
    loading = false;

    result: Result = {
        appointmentId: +this.route.snapshot.paramMap.get('appointmentId'),
        observations: '',
        conclusions: '',
        recommendations: '',
    };

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private router: Router,
        private apiDataService: ApiDataService
    ) { }

    ngOnInit(): void {
        this.store.select(AppointmentsState.appointments)
            .subscribe(appointments => {
                const appointmentId = this.route.snapshot.paramMap.get('appointmentId');
                this.appointment = appointments.find(p => p.id.toString() === appointmentId);
            });
    }



    onSave(result: Result): void {
        this.result.appointmentId = +this.route.snapshot.paramMap.get('appointmentId');
        this.apiDataService.addResult(result = this.result)
            .subscribe(
                () => {
                    alert('Dodano wynik do wizyty')
                    this.router.navigate(['../../index'], { relativeTo: this.route });
                },
                error => {
                    alert('Nie udało się dodać wyniku');
                    console.error(error);
                });
    }

    onFinish(): void {
        this.apiDataService.finishAppointment(this.result.appointmentId)
            .subscribe(
                () => {
                    alert('Zakończono wizytę')
                    this.router.navigate(['../../index'], { relativeTo: this.route });
                },
                error => {
                    alert('Nie udało się zakończyć wizyty');
                    console.error(error);
                });
    }
}
