import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { DatePickerComponent } from './date-picker/date-picker.component';

const components = [
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    InputFieldComponent,
    DatePickerComponent,

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule
    ],
    declarations: [
        components
    ],
    exports: [
        components
    ]
})
export class ComponentsModule { }
