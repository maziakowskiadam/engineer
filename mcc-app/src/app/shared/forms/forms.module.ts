import { NgModule } from '@angular/core';
import { AddPatientFormComponent } from './add-patient-form/add-patient-form.component';
import { ComponentsModule } from '../components/components.module';
import { IdentityFormComponent } from './identity-form/identity-form.component';

@NgModule({
    declarations: [
        AddPatientFormComponent,
        IdentityFormComponent
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        AddPatientFormComponent,
        IdentityFormComponent
    ]
})
export class FormsModule { }
