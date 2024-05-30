import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Airline } from '../../models/airline.model';
import { AirlineService } from '../../services/airlinie.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrl: './airline-list.component.css'
})
export class AirlineListComponent {

  dataSource: Airline[] = [];
  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];

  public constructor(private airlineService: AirlineService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
    this.reloadData();
  }

  reloadData() {
    this.airlineService.getAll().subscribe(result => {
      this.dataSource = result.sort((a, b) => a.id - b.id);
    });
  }

  async edit(e: Airline) {
    await this.router.navigate(['airline', e.id]);
  }

  async add() {
    await this.router.navigate(['airline']);
  }

  delete(e: Airline) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.airlineService.delete(e.id).subscribe({
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
