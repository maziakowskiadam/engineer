import { Result } from 'src/app/shared/models/entities/Result';

export class GetAllResults {
    static readonly type = '[ResultsState] GetAllResults';
}

export class SetResults {
    static readonly type = '[ResultsState] SetResults';
    constructor(public results: Result[]) { }
}
