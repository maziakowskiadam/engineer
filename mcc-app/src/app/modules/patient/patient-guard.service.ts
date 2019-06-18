import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { IdentityState } from 'src/app/store/states/identity.state';
import { IdentityRole } from 'src/app/shared/models/entities/IdentityRole';

@Injectable({
    providedIn: 'root'
})
export class PatientGuardService implements CanActivate {
    private role: string;

    constructor(store: Store) {
        store.select(IdentityState.role)
            .subscribe(role => {
                this.role = role;
            });
    }

    canActivate(): boolean {
        return this.role === IdentityRole.Patient;
    }

}
