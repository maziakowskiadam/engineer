import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { LoginIdentity } from 'src/app/store/actions/IdentityActions';
import { IdentityState } from 'src/app/store/states/identity.state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    email: string;
    password: string;

    loading = false;
    error = false;
    wasRequestSent = false;

    constructor(
        private store: Store,
        private router: Router
    ) {
        this.store.select(IdentityState.jwt)
            .subscribe(this.handleLoginResult.bind(this));
    }

    onSubmit(): void {
        this.wasRequestSent = true;
        this.loading = true;
        this.store.dispatch(new LoginIdentity(this.email, this.password))
            .subscribe(() => {

            }, error => {
                alert('wystąpił błąd')
                console.log(error);
            }
            );
    }

    handleLoginResult(jwt): void {
        if (!jwt && this.wasRequestSent) {
            this.loading = false;
            this.error = true;

            this.password = '';
        }

        if (this.wasRequestSent && jwt) {
            this.loading = false;
            this.error = false;

            console.log('Redirect home');
            this.router.navigate(['']);
        }
    }

    gotoRegister() {
        this.router.navigate(['add-patient']);
    }

    gotoPasswordRecovery() {
        this.router.navigate(['password-recovery']);
    }


}
