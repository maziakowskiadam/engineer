import { Component, OnInit } from '@angular/core';
import { NavbarLink } from '../models/NavbarLink';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetIdentity } from 'src/app/store/actions/IdentityActions';
import { NavbarState } from 'src/app/store/states/navbar.state';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    showNavbar;
    links: NavbarLink[];

    constructor(
        private router: Router,
        private store: Store
    ) { }

    ngOnInit() {
        const links$ = this.store.select(NavbarState.navLinks);
        const showNavbar$ = this.store.select(NavbarState.showNavbar);
        combineLatest(links$, showNavbar$)
            .subscribe(([
                links,
                showNavbar
            ]) => {
                this.links = links;
                this.showNavbar = showNavbar;
            });
    }

    logout(): void {
        this.store.dispatch(new SetIdentity(null, null));
        this.router.navigate(['']);
    }

}
