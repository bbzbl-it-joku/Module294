import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Passenger } from '../../models/passenger.model';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrl: './passenger-detail.component.css'
})
export class PassengerDetailComponent implements OnInit {
  passenger: Passenger = new Passenger();

  public passengerForm = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    address: new UntypedFormControl(''),
  });

  constructor(private passengerService: PassengerService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder) { }

  public ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.passengerService.get(id).subscribe(obj => {
        this.passenger = obj;
        this.passengerForm = this.formBuilder.group(obj);
      });
    } else {
      this.passengerForm = this.formBuilder.group(this.passenger);
    }
  }

  async back() {
    await this.router.navigate(['passengers']);
  }

  async save(formData: any) {
    console.log(formData);
    this.passenger = Object.assign(formData);

    if (this.passenger.id) {
      this.passengerService.update(this.passenger).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Item could not be saved, server error!', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.passengerService.save(this.passenger).subscribe({
        next: () => {
          this.snackBar.open('New Item saved!', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('New item could not be saved, server error!', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
