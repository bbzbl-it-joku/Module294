import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Passenger } from '../models/passenger.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  readonly backendUrl = environment.backendBaseUrl + 'passenger';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Passenger[]>{
    return this.http.get<Passenger[]>(this.backendUrl);
  }

  public get(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(this.backendUrl + `/${id}`);
  }

  public save(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(this.backendUrl, passenger);
  }

  public update(passenger: Passenger): Observable<Passenger>{
    return this.http.put<Passenger>(this.backendUrl + `/${passenger.id}`, passenger);
  }

  public delete(id: number) {
    return this.http.delete(this.backendUrl + `/${id}`);
  }
}
