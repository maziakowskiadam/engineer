import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index'
    },
    {
        path: 'index',
        component: ManagementIndexComponent
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
export class ManagementRoutingModule {}
