import { Room } from 'src/app/shared/models/entities/Room';

export interface RoomsStateModel {
    rooms: Room[];
    loading?: boolean;
}