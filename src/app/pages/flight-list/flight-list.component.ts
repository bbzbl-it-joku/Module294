import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Seat } from '../../models/seat.model';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css'
})
export class FlightListComponent {
  dataSource: Flight[] = [];
  displayedColumns: string[] = ['id', 'origin', 'destination', 'departureTime', 'actions'];

  public constructor(private flightService: FlightService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.flightService.getAll().subscribe(result => {
      this.dataSource = result.sort((a, b) => a.id - b.id);
    });
  }

  add() {
    this.router.navigate(['/flight']);
  }

  openBooking(flight: Flight) {
    this.router.navigate(['/flight', flight.id, 'booking']);
  }

  edit(flight: Flight) {
    this.router.navigate(['/flight', flight.id]);
  }

  delete(e: Seat) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.flightService.delete(e.id).subscribe({
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
