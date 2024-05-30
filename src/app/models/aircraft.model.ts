import { Airline } from "./airline.model";

export class Aircraft {
  id!: number;
  airline!: Airline;
  type = '';
  capacity = 0;
}
