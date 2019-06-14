import { Component } from "@angular/core";
import { LoginDto } from 'src/app/shared/models/dtos/LoginDto';
import { Management } from 'src/app/shared/models/entities/Management';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-management',
    templateUrl: './add-management.component.html',
})
export class AddManagementComponent {

    managementIdentity: LoginDto = {
        email: '',
        password: ''
    }

    management: Management = {
        firstName: '',
        lastName: '',
        department: ''
    };

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    onSubmit(): void {
        this.registerService.addManagement({
            identity: this.managementIdentity,
            management: this.management
        }).subscribe(() => {
            this.router.navigate(['../index'], { relativeTo: this.route });
        }, error => {
            alert('Nie udało się dodać administratora');
            console.error(error);
        });
    }

}
