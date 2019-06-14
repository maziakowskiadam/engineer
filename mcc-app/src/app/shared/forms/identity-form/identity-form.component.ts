import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginDto } from 'src/app/shared/models/dtos/LoginDto';

@Component({
    selector: 'app-identity-form',
    templateUrl: './identity-form.component.html',
})
export class IdentityFormComponent {

    identity: LoginDto = {
        email: '',
        password: ''
    };

    @Output()
    valueChange: EventEmitter<LoginDto> = new EventEmitter();

    set value(value: LoginDto) {
        this.identity = value;
    }

    @Input()
    get value(): LoginDto {
        return this.identity;
    }

}
