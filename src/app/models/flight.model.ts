import { Aircraft } from "./aircraft.model";

export class Flight {
    id!: number;
    departureTime = '';
    destination = '';
    origin = '';
    aircraft!: Aircraft;
}
