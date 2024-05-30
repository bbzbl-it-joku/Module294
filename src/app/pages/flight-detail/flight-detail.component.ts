import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrl: './flight-detail.component.css'
})
export class FlightDetailComponent implements OnInit {
  flight: Flight = new Flight();

  public flightForm = new UntypedFormGroup({
    origin: new UntypedFormControl(''),
    destination: new UntypedFormControl(''),
    departureTime: new UntypedFormControl('')
  });

  constructor(
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder
  ) { }

  public ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.flightService.get(id).subscribe(obj => {
        this.flight = obj;
        // Format the departure time correctly
        obj.departureTime = this.formatDateTime(obj.departureTime);
        this.flightForm = this.formBuilder.group(obj);
      });
    } else {
      this.flightForm = this.formBuilder.group(this.flight);
    }
  }

  async back() {
    await this.router.navigate(['flights']);
  }

  async save(formData: any) {
    this.flight = Object.assign(formData);

    if (this.flight.id) {
      this.flightService.update(this.flight).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open('Item could not be saved, server error!', 'Close', { duration: 5000, politeness: 'assertive' });
        }
      });
    } else {
      this.flightService.save(this.flight).subscribe({
        next: () => {
          this.snackBar.open('New Item saved!', 'Close', { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open('New item could not be saved, server error!', 'Close', { duration: 5000, politeness: 'assertive' });
        }
      });
    }
  }

  private formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Format: yyyy-MM-ddThh:mm:ss
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
