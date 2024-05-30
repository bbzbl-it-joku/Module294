import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../models/aircraft.model';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AircraftService } from '../../services/aircraft.service';
import { AirlineService } from '../../services/airlinie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from '../../models/airline.model';

@Component({
  selector: 'app-aircraft-details',
  templateUrl: './aircraft-details.component.html',
  styleUrl: './aircraft-details.component.css'
})
export class AircraftDetailsComponent implements OnInit {
  aircraft: Aircraft = new Aircraft();

  airlines: Airline[] = [];

  public aircraftForm = new UntypedFormGroup({
    type: new UntypedFormControl(''),
    capacity: new UntypedFormControl(''),
    airlineId: new UntypedFormControl('')
  });

  constructor(private aircraftService: AircraftService, private airlineService: AirlineService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder) { }

  public ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.aircraftService.get(id).subscribe(obj => {
        this.aircraft = obj;
        this.aircraftForm = this.formBuilder.group(obj);
        this.aircraftForm.addControl('airlineId', new UntypedFormControl(obj.airline.id));
      });
    }

    this.airlineService.getAll().subscribe(obj => {
      this.airlines = obj.sort((a, b) => a.id - b.id);
    });
  }

  async back() {
    await this.router.navigate(['aircrafts']);
  }

  async save(formData: any) {
    this.aircraft = Object.assign(formData);

    this.aircraft.airline = this.airlines.find(o => o.id === formData.airlineId) as Airline;

    if (this.aircraft.id) {
      this.aircraftService.update(this.aircraft).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Item could not be saved, server error!', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.aircraftService.save(this.aircraft).subscribe({
        next: () => {
          this.snackBar.open('New Item saved!', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Item could not be saved, server error!', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
