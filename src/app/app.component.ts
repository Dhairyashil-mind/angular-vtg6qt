import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) {}
  
  openDialog() {
    const dialogRef = this.dialog.open(InvitationDialogComponent, {
      minHeight: '80%',
      minWidth: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
