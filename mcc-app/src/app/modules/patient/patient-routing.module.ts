import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientIndexComponent } from './components/patient-index/patient-index.component';
import { PatientResultsComponent } from './components/patient-results/patient-results.component';
import { BookComponent } from './components/book/book.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'index'
    },
    {
        path: 'index',
        component: PatientIndexComponent
    },
    {
        path: 'results/:appointmentId',
        component: PatientResultsComponent
    },
    {
        path: 'book',
        component: BookComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PatientRoutingModule { }
