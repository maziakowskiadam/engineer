import { Result } from 'src/app/shared/models/entities/Result';

export interface ResultsStateModel {
    results: Result[];
    loading?: boolean;
}
