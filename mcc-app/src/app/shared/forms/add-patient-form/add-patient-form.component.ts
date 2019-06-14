import { Component, EventEmitter, Output } from '@angular/core';
import { Patient } from '../../models/entities/Patient';
import { LoginDto } from '../../models/dtos/LoginDto';
import { AddPatientDto } from '../../models/dtos/AddPatientDto';

@Component({
    selector: 'app-add-patient-form',
    templateUrl: './add-patient-form.component.html'
})
export class AddPatientFormComponent {

    patientIdentity: LoginDto = {
        email: '',
        password: ''
    };

    patient: Patient = {
        firstName: '',
        lastName: '',
        pesel: '',
        gender: 'M',
        street: '',
        house: '',
        zipcode: '',
        city: '',
    };

    gender = {
        male: true,
        female: false
    };

    @Output()
    submit: EventEmitter<AddPatientDto> = new EventEmitter();

    @Output()
    cancel: EventEmitter<void> = new EventEmitter();

    onGenderChange(gender: string): void {
        this.patient.gender = gender;
    }

    onSubmit(): void {
        this.submit.emit({
            identity: this.patientIdentity,
            patient: this.patient
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }

}
