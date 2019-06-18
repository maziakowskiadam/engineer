import { DoctorsState } from './states/doctors.state';
import { IdentityState } from './states/identity.state';
import { PatientsState } from './states/patients.state';
import { AppointmentsState } from './states/appointments.state';
import { RoomsState } from './states/rooms.state';
import { ResultsState } from './states/results.state';

export const states = [
    IdentityState,
    DoctorsState,
    PatientsState,
    AppointmentsState,
    RoomsState,
    ResultsState
];
