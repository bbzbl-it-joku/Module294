import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  readonly backendUrl = environment.backendBaseUrl + 'seat';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.backendUrl);
  }

  public get(id: number): Observable<Seat> {
    return this.http.get<Seat>(this.backendUrl + `/${id}`);
  }

  public save(seat: Seat): Observable<Seat> {
    return this.http.post<Seat>(this.backendUrl, seat);
  }

  public update(seat: Seat): Observable<Seat>{
    return this.http.put<Seat>(this.backendUrl + `/${seat.id}`, seat);
  }

  public delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
