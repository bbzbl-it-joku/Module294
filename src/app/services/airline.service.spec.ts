import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { Airline } from '../models/airline.model';
import { AirlineService } from './airlinie.service';

describe('AirlineService', () => {
  let service: AirlineService;
  let httpSpy: Spy<HttpClient>;

  const fakeAirlines: Airline[] = [
    {
      id: 1,
      name: 'Airline 1',
      country: 'Country 1'
    },
    {
      id: 2,
      name: 'Airline 2',
      country: 'Country 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(AirlineService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of airlines', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeAirlines);

    service.getAll().subscribe({
      next:
        airlines => {
          expect(airlines).toHaveSize(fakeAirlines.length);
          done();
        },
      error: done.fail
    }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new airline', (done: DoneFn) => {

    const newAirline: Airline = {
      id: 3,
      name: 'Airline 3',
      country: 'Country 3'
    };

    httpSpy.post.and.nextWith(newAirline);

    service.save(newAirline).subscribe({
      next: airline => {
        expect(airline).toEqual(newAirline);
        done();
      },
      error: done.fail
    }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an airline', (done: DoneFn) => {

    const airline = fakeAirlines[0];
    airline.name = 'Updated Airline';

    httpSpy.put.and.nextWith(airline);

    service.update(airline).subscribe({
      next: airline => {
        expect(airline.name).toEqual('Updated Airline');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing airline', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
