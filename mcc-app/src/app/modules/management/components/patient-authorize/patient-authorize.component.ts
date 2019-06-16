import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/shared/models/entities/Patient';
import { Store } from '@ngxs/store';
import { PatientsState } from 'src/app/store/states/patients.state';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
    selector: 'app-patient-authorize',
    templateUrl: './patient-authorize.component.html'
})
export class PatientAuthorizeComponent implements OnInit {

    patient: Patient;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private registerService: RegisterService,
        private router: Router
    ) { }

    ngOnInit() {
        this.store.select(PatientsState.patients)
            .subscribe(patients => {
                const patientId = this.route.snapshot.paramMap.get('patientId');
                this.patient = patients.find(p => p.id.toString() === patientId);
            });
    }

    authorize(): void {
        this.loading = true;
        this.registerService.authorizePatient(this.patient.identityId)
            .subscribe(() => {
                this.loading = false;
                this.router.navigate(['../../patients-list'], { relativeTo: this.route });
            }, error => {
                this.loading = false;
                alert('Wystąpił błąd');
                console.error(error);
            });
    }

}
