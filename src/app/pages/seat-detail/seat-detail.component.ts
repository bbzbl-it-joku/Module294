import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Passenger } from '../../models/passenger.model';
import { Seat } from '../../models/seat.model';
import { PassengerService } from '../../services/passenger.service';
import { SeatService } from '../../services/seat.service';

@Component({
  selector: 'app-seat-detail',
  templateUrl: './seat-detail.component.html',
  styleUrl: './seat-detail.component.css'
})
export class SeatDetailComponent  implements OnInit {
  seat: Seat = new Seat();

  passengers: Passenger[] = [];

  public seatForm = new UntypedFormGroup({
    seatNumber: new UntypedFormControl(''),
    passengerId: new UntypedFormControl('')
  });

  constructor(private seatService: SeatService, private passengerService: PassengerService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder) { }

  public ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.seatService.get(id).subscribe(obj => {
        this.seat = obj;
        this.seatForm = this.formBuilder.group(obj);
        this.seatForm.addControl('passengerId', new UntypedFormControl(obj.passenger.id));
      });
    }

    this.passengerService.getAll().subscribe(obj => {
      this.passengers = obj.sort((a, b) => a.id - b.id);
    });
  }

  async back() {
    await this.router.navigate(['seats']);
  }

  async save(formData: any) {
    this.seat = Object.assign(formData);

    this.seat.passenger = this.passengers.find(o => o.id === formData.passengerId) as Passenger;

    if (this.seat.id) {
      this.seatService.update(this.seat).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Item could not be saved, server error!', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.seatService.save(this.seat).subscribe({
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

