import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddExaminationTypeDto } from 'src/app/shared/models/dtos/AddExaminationTypeDto';

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
        private apiDataService: ApiDataService
    ) { }

    onSubmit(): void {
        this.apiDataService.addExaminationType(this.examinationType).subscribe(() => {
        });
        this.examinationType.name = '';
        this.examinationType.description = '';
        this.examinationType.duration = '';
    }
}
