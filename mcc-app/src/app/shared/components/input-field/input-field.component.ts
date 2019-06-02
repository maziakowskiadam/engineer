import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html'
})
export class InputFieldComponent {

    @Input()
    name: string;

    @Input()
    title: string;

    @Input()
    inputType = 'text';

    inputValue: string;

    @Output()
    valueChange: EventEmitter<string> = new EventEmitter();

    set value(value: string) {
        this.inputValue = value;
        this.valueChange.emit(value);
    }

    @Input()
    get value() {
        return this.inputValue;
    }

}


