import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddExaminationTypeDto } from 'src/app/shared/models/dtos/AddExaminationTypeDto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-examination-type',
    templateUrl: './add-examination-type.component.html',
})
export class AddExaminationTypeComponent {

    examinationType: AddExaminationTypeDto = {
        name: '',
        description: '',
        duration: '',
    };

    constructor(
        private apiDataService: ApiDataService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    onSubmit(): void {
        this.apiDataService.addExaminationType(this.examinationType).subscribe(() => {
            alert('Dodano rodzaj badania');
            this.router.navigate(['../index'], { relativeTo: this.route });
        });
        this.examinationType.name = '';
        this.examinationType.description = '';
        this.examinationType.duration = '';
    }
}
