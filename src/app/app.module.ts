import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InvitationService } from './services/invitation.service';

@NgModule({
  declarations: [
    AppComponent,
    InvitationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    NgbModule,
    TextFieldModule,
    MatChipsModule,
    MatTooltipModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ InvitationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
