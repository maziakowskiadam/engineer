import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { MANAGEMENT_NAV_LINKS } from '../../constants/management-navbar';
import { SetNavbarState } from 'src/app/store/actions/NavbarActions';
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
    }
    constructor(
        store: Store,
        private apiDataService: ApiDataService
    ) {
        store.dispatch(new SetNavbarState(MANAGEMENT_NAV_LINKS, true));
    }

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
