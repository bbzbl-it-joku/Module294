import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Seat } from '../../models/seat.model';
import { SeatService } from '../../services/seat.service';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrl: './seat-list.component.css'
})
export class SeatListComponent {
  dataSource: Seat[] = [];
  displayedColumns: string[] = ['id', 'seatNumber', 'passenger', 'actions'];

  public constructor(private seatService: SeatService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.seatService.getAll().subscribe(result => {
      this.dataSource = result.sort((a, b) => a.id - b.id);
    });
  }

  async edit(e: Seat) {
    await this.router.navigate(['seat', e.id]);
  }

  async add() {
    await this.router.navigate(['seat']);
  }

  delete(e: Seat) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.seatService.delete(e.id).subscribe({
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
