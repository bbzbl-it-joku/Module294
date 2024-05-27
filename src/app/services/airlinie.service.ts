import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Airline } from '../models/airline.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  readonly backendUrl = environment.backendBaseUrl + 'airline';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Airline[]>{
    return this.http.get<Airline[]>(this.backendUrl);
  }

  public get(id: number): Observable<Airline> {
    return this.http.get<Airline>(this.backendUrl + `/${id}`);
  }

  public save(airline: Airline): Observable<Airline> {
    return this.http.post<Airline>(this.backendUrl, airline);
  }

  public update(airline: Airline): Observable<Airline>{
    return this.http.put<Airline>(this.backendUrl + `/${airline.id}`, airline);
  }

  public delete(id: number) {
    return this.http.delete(this.backendUrl + `/${id}`);
  }
}
