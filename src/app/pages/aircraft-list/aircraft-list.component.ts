import { Component } from '@angular/core';
import { Aircraft } from '../../models/aircraft.model';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AircraftService } from '../../services/aircraft.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AirlineService } from '../../services/airlinie.service';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrl: './aircraft-list.component.css'
})
export class AircraftListComponent {
  dataSource: Aircraft[] = [];
  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];

  isUnique = true;
  aircraft = new Aircraft();
  public aircraftForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    age: new UntypedFormControl(''),
  });


  public constructor(private aircraftService: AircraftService, private airlineService: AirlineService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.aircraftService.getAll().subscribe(result => {
      this.dataSource = result;
    });
  }

  async edit(e: Aircraft) {
    await this.router.navigate(['aircraft', e.id]);
  }

  async add() {
    await this.router.navigate(['aircraft']);
  }

  delete(e: Aircraft) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.aircraftService.delete(e.id).subscribe({
          next: (response: any) => {
            if (response === null) {
              this.snackBar.open('Item deleted!', 'Close', { duration: 5000 });
              this.reloadData();
            } else {
              this.snackBar.open('Item could not be deleted, server error!', 'Close', { duration: 5000 });
            }
          },
          error: () => this.snackBar.open('Item could not be deleted, server error!', 'Close', { duration: 5000 })
        });
      }
    });
  }
}
