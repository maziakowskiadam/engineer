import { NgModule } from '@angular/core';
import { IdentityFormComponent } from './components/identity-form/identity-form.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
    declarations: [
        IdentityFormComponent
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        IdentityFormComponent
    ]
})
export class SharedModule {}
