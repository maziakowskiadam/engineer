import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiDataService } from 'src/app/shared/services/api-data.service';
import { AddExaminationTypeDto } from 'src/app/shared/models/AddExaminationTypeDto';

@Component({
    selector: 'app-add-examination-type',
    templateUrl: './add-examination-type.component.html',
    styleUrls: ['./add-examination-type.component.scss'],
})
export class AddExaminationTypeComponent {

    examinationType: AddExaminationTypeDto = {
        name: '',
        description: '',
        duration: '',
    };

    constructor(
        private apiDataService: ApiDataService
    ) {}

    onSubmit(): void {
        this.apiDataService.addExaminationType(this.examinationType).subscribe(result => {
            console.log(result);
        });
        this.examinationType.name = '';
        this.examinationType.description = '';
        this.examinationType.duration = '';
    }
}
