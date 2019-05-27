import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarLink } from '../models/NavbarLink';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    showNavbar = true;
    links: NavbarLink[] = [];

    private path = '';

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events
            .subscribe((event: any) => {
                if (event instanceof NavigationEnd) {
                    this.path = (event as NavigationEnd).url;
                    this.pathChanged();
                }
            });
        window['navbar'] = this;
    }

    private pathChanged(): void {
        this.showNavbar = this.updateShowNavbar();
        this.links = this.updateLinks();
    }

    private updateShowNavbar(): boolean {
        if (this.path.startsWith('/login')) {
            return false;
        }

        return true;
    }

    private updateLinks(): NavbarLink[] {
        if (this.path.includes('/doctors')) {
            return [
                {
                    name: 'Moje wizyty',
                    path: 'doctors/visits'
                },
                {
                    name: 'Moi pacjenci',
                    path: 'doctors/patients'
                }
            ];
        }

        return [];
    }

}