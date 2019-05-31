import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-room-page',
    templateUrl: './add-room-page.component.html',
    styleUrls: ['./add-room-page.component.scss']
})
export class AddRoomPageComponent {

    constructor(
        private router: Router,
    ) { }

    goToManagement() {
        this.router.navigate(['management']);
    }
}
