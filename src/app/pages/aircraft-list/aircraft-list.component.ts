import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Aircraft } from '../../models/aircraft.model';
import { AircraftService } from '../../services/aircraft.service';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrl: './aircraft-list.component.css'
})
export class AircraftListComponent {
  dataSource: Aircraft[] = [];
  displayedColumns: string[] = ['id', 'airline', 'type', 'capacity', 'actions'];

  public constructor(private aircraftService: AircraftService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.aircraftService.getAll().subscribe(result => {
      this.dataSource = result.sort((a, b) => a.id - b.id);
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
