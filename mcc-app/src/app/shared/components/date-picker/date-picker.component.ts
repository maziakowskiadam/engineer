import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html'
})
export class DatePickerComponent {

    date: string;

    @Output()
    dateChange: EventEmitter<string> = new EventEmitter();

    onBlur(): void {
        this.dateChange.emit(this.date);
    }

}
