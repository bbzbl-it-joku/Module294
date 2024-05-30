import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Passenger } from '../../models/passenger.model';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrl: './passenger-list.component.css'
})
export class PassengerListComponent {

  dataSource: Passenger[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'actions'];


  public constructor(private passengerService: PassengerService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.passengerService.getAll().subscribe(result => {
      this.dataSource = result.sort((a, b) => a.id - b.id);
    });
  }

  async edit(e: Passenger) {
    await this.router.navigate(['passenger', e.id]);
  }

  async add() {
    await this.router.navigate(['passenger']);
  }

  delete(e: Passenger) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.passengerService.delete(e.id).subscribe({
          next: (response: any) => {
            if (response.ok) {
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
