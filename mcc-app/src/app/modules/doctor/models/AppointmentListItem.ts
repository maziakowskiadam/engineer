export interface AppointmentListItem {
    id: number;
    patient: string; // Jan Kowalski
    room: string; // Gabinet 8
    timeStart: string; // 9:00
    isDone?: boolean;
}
