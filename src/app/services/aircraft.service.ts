import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Aircraft } from '../models/aircraft.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {
  readonly backendUrl = environment.backendBaseUrl + 'aircraft';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Aircraft[]>{
    return this.http.get<Aircraft[]>(this.backendUrl);
  }

  public get(id: number): Observable<Aircraft> {
    return this.http.get<Aircraft>(this.backendUrl + `/${id}`);
  }

  public save(aircraft: Aircraft): Observable<Aircraft> {
    return this.http.post<Aircraft>(this.backendUrl, aircraft);
  }

  public update(aircraft: Aircraft): Observable<Aircraft>{
    return this.http.put<Aircraft>(this.backendUrl + `/${aircraft.id}`, aircraft);
  }

  public delete(id: number) {
    return this.http.delete(this.backendUrl + `/${id}`);
  }
}
