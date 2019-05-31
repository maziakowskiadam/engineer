import { NgModule } from '@angular/core';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';

@NgModule({
    declarations: [
        ManagementIndexComponent
    ],
    imports: [
        CommonModule,
        ManagementRoutingModule
    ]
})
export class ManagementModule { }
