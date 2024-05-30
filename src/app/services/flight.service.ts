import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  readonly backendUrl = environment.backendBaseUrl + 'flight';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.backendUrl);
  }

  public get(id: number): Observable<Flight> {
    return this.http.get<Flight>(this.backendUrl + `/${id}`);
  }

  public getBySeatId(id: number): Observable<Flight> {
    return this.http.get<Flight>(this.backendUrl + `/seat/${id}`);
  }

  public save(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.backendUrl, flight);
  }

  public update(flight: Flight): Observable<Flight>{
    return this.http.put<Flight>(this.backendUrl + `/${flight.id}`, flight);
  }

  public delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
