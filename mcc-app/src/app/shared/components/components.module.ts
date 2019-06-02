import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const components = [
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    InputFieldComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        components
    ],
    exports: [
        components
    ]
})
export class ComponentsModule {}
