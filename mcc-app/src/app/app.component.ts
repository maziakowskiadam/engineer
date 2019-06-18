import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IdentityState } from './store/states/identity.state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

    title = 'mcc-app';

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngAfterContentInit(): void {
        this.store.select(IdentityState.role)
            .subscribe(role => {
                switch (role) {
                    case 'MANAGEMENT':
                        setTimeout(() => {
                            this.router.navigate(['management'], { relativeTo: this.route });
                        });
                        break;
                    case 'DOCTOR':
                        setTimeout(() => {
                            this.router.navigate(['doctor'], { relativeTo: this.route });
                        });
                        break;
                    case 'PATIENT':
                        setTimeout(() => {
                            this.router.navigate(['patient'], { relativeTo: this.route });
                        });
                        break;
                    default:
                        setTimeout(() => {
                            this.router.navigate(['identity'], { relativeTo: this.route });
                        });
                        break;
                }
            });
    }


}
