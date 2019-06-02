import { CanActivate, Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IdentityState } from '../store/states/identity.state';
import { combineLatest } from 'rxjs';
import { RouteUrl } from '../shared/constants/route.constants';
import { IdentityRole } from '../shared/models/IdentityRole';


@Injectable({
    providedIn: 'root'
})
export class IdentityGuard implements CanActivate {

    private jwt: string;
    private role: string;

    constructor(
        store: Store,
        private router: Router
    ) {
        const jwt$ = store.select(IdentityState.jwt);
        const role$ = store.select(IdentityState.role);
        combineLatest(jwt$, role$)
            .subscribe(([
                jwt,
                role
            ]) => {
                this.jwt = jwt;
                this.role = role;
            });
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        return true;

        // const isAuthorizedPatient = this.checkIfPatientAuthorized();
        // if (!isAuthorizedPatient) {
        //     this.router.navigate(['unauthorized']);
        //     return false;
        // }

        // const isRoleValid = this.validateRole(route.url[0]);
        // if (isRoleValid) {
        //     return true;
        // }

        // this.router.navigate(['']);
        // return false;
    }

    private checkIfPatientAuthorized(): boolean {
        return this.role !== IdentityRole.PatientUnauthorized;
    }

    private validateRole(url: UrlSegment): boolean {
        switch (url.path) {
            case RouteUrl.DOCTORS:
                return this.role === IdentityRole.Doctor;
            case RouteUrl.PATIENTS:
                return this.role === IdentityRole.Patient;
            case RouteUrl.MANAGEMENT:
                return this.role === IdentityRole.Doctor;
            default:
                return false;
        }
    }

}
