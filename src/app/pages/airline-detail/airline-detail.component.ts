import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../../services/airlinie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Airline } from '../../models/airline.model';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
  styleUrl: './airline-detail.component.css'
})
export class AirlineDetailComponent implements OnInit {
  airline: Airline = new Airline();

  public airlineForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    country: new UntypedFormControl('')
  });

  constructor(private airlineService: AirlineService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder) { }

  public ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.airlineService.get(id).subscribe(obj => {
        this.airline = obj;
        this.airlineForm = this.formBuilder.group(obj);
      });
    } else {
      this.airlineForm = this.formBuilder.group(this.airline);
    }
  }

  async back() {
    await this.router.navigate(['airlines']);
  }

  async save(formData: any) {
    this.airline = Object.assign(formData);

    if (this.airline.id) {
      this.airlineService.update(this.airline).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Item could not be saved, server error!', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.airlineService.save(this.airline).subscribe({
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
