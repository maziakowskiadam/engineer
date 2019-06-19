import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetIdentity } from 'src/app/store/actions/IdentityActions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    url: string;

    constructor(
        private router: Router,
        private store: Store,
        private route: ActivatedRoute
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.url = event.url.split('/')[1];
            }
        });
    }

    logout(): void {
        this.store.dispatch(new SetIdentity(null, null)).subscribe(() => {
            setTimeout(() => {
                this.router.navigate(['../../'], { relativeTo: this.route });
                this.router.navigate(['identity/login']);
            });
        });
    }

}
