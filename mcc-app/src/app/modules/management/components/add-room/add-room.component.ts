import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddRoomDto } from 'src/app/shared/models/AddRoomDto';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.scss']
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
        this.apiDataService.addRoom(this.room).subscribe(result => {
            console.log(result);
        });
        this.room.number = '';
        this.room.building = '';
        this.room.floor = '';
        this.room.description = '';
    }
}
