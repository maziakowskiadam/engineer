import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-activate-account-page',
    templateUrl: './activate-account-page.component.html',
    styleUrls: ['activate-account-page.component.scss']
})
export class ActivateAccountPageComponent {

    constructor(
        private router: Router,
    ) { }

    accounts: Account[] =
        [
            {
                firstName: 'Adam',
                lastName: 'Maziakowski',
                login: 'maziakowskiadam'
            },
            {
                firstName: 'Joanna',
                lastName: 'Maziakowska',
                login: 'maziasia'
            },
            {
                firstName: 'Krzysztof',
                lastName: 'Maziakowski',
                login: 'krzysztof.maziakowski'
            },
        ];

    activateAccount() {
        this.router.navigate(['management']);
    }
}

export interface Account {
    firstName?: string;
    lastName?: string;
    login?: string;
}
