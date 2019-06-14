import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddRoomDto } from 'src/app/shared/models/dtos/AddRoomDto';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
})
export class AddRoomComponent {

    room: AddRoomDto = {
        number: '',
        building: '',
        floor: '',
        description: '',
    };

    constructor(
        private apiDataService: ApiDataService
    ) { }

    onSubmit() {
        this.apiDataService.addRoom(this.room).subscribe(() => {
        });
        this.room.number = '';
        this.room.building = '';
        this.room.floor = '';
        this.room.description = '';
    }
}
