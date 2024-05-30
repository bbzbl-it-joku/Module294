import { Passenger } from "./passenger.model";

export class Seat {
  id!: number;
  seatNumber = '';
  passenger!: Passenger;
}
