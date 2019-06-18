import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddRoomDto } from 'src/app/shared/models/dtos/AddRoomDto';
import { ActivatedRoute, Router } from '@angular/router';

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
        private apiDataService: ApiDataService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    onSubmit() {
        this.apiDataService.addRoom(this.room).subscribe(() => {
            alert('Dodano gabinet');
            this.router.navigate(['../index'], { relativeTo: this.route });
        });
        this.room.number = '';
        this.room.building = '';
        this.room.floor = '';
        this.room.description = '';
    }
}
