export interface Appointment {
    id?: number;
    date: string;
    time: string;
    patientId: number;
    doctorId: number;
    roomId: number;
    done: boolean;
    // results: Result[]
}
