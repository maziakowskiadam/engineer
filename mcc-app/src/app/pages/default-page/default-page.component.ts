import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { IdentityState } from 'src/app/store/states/identity.state';
import { IdentityRole } from 'src/app/models/IdentityRole';
import { RouteUrl } from 'src/app/constants/route.constants';

@Component({
    selector: 'app-default-page',
    template: 'You\'ll be redirected'
})
export class DefaultPageComponent {

    constructor(
        store: Store,
        router: Router
    ) {
        store.select(IdentityState.role)
            .subscribe(role => {
                if (!role) {
                    router.navigate(['login']);
                }

                switch (role) {
                    case IdentityRole.Doctor:
                        router.navigate([RouteUrl.DOCTORS]);
                        break;
                    case IdentityRole.Patient:
                        router.navigate([RouteUrl.PATIENTS]);
                        break;
                    case IdentityRole.PatientUnauthorized:
                        router.navigate([RouteUrl.UNAUTHORIZED]);
                        break;
                    case IdentityRole.Management:
                        router.navigate([RouteUrl.MANAGEMENT]);
                        break;
                }
            });
    }


}
