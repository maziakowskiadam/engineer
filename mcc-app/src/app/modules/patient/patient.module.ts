import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientIndexComponent } from './components/patient-index/patient-index.component';
import { PatientResultsComponent } from './components/patient-results/patient-results.component';
import { BookComponent } from './components/book/book.component';



@NgModule({
    declarations: [
        PatientIndexComponent,
        PatientResultsComponent,
        BookComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        PatientRoutingModule
    ]
})
export class PatientModule { }
