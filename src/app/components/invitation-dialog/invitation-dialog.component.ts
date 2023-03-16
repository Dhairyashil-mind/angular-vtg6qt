import { ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InvitationService } from "../../services/invitation.service";
import { Email, EmailRequest } from '../../models/invite.model';
import { EMAIL_BODY } from '../../data/app.constant';

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InvitationDialogComponent {
  public invitationForm: FormGroup;
  public addOnBlur = true;
  public readonly separatorKeysCodes = [ENTER] as const;
  public emails: Email[] = [];
  public matcher = new MyErrorStateMatcher();
  public sanitizedHtml: SafeHtml = '';

  private htmlStr: string = '';
  private invalidEmailIndex: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<InvitationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private sanitizer: DomSanitizer,
    private invitationService: InvitationService
  ) {
    this.htmlStr = EMAIL_BODY;
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlStr);
    this.invitationForm = this.fb.group({
      'emails': [[], [Validators.required, this.validateEmail.bind(this)]],
      'subject': ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.emails.push({ id: value, valid: true });
        if (this.invalidEmailIndex.length > 0) {
          this.invitationForm.controls['emails'].setErrors({ 'invalid': true });
        }
      } else {
        this.emails.push({ id: value, valid: false });
        this.invalidEmailIndex.push(this.emails.length - 1);
        this.invitationForm.controls['emails'].setErrors({ 'invalid': true });
      }
    }
    event.chipInput!.clear();
  }

  public remove(email: Email): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }

    if (this.invalidEmailIndex.length > 0 && this.invalidEmailIndex.includes(index)) {
      let a = this.invalidEmailIndex.indexOf(index)
      this.invalidEmailIndex.splice(a, 1);
    }

    if (this.invalidEmailIndex.length === 0 && this.emails.length > 0) {
      this.invitationForm.controls['emails'].setErrors(null);
    } else {
      this.invitationForm.controls['emails'].setErrors({ 'invalid': true });
    }
  }

  public sendMail() {
    let reqData: EmailRequest = {
      emails: this.emails.map(((email: Email) => email.id)),
      subject: this.invitationForm.controls['subject'].value,
      body: this.htmlStr
    }
    this.closeDialog();
    this.invitationService.sendEmail(reqData);
  }

  public trackByMethod(index: number, el: Email) {
    return el.id;
  }

  private validateEmail(control: FormControl) {
    let email = control.value;
    if (this.invalidEmailIndex.length > 0 || (email && email.length > 0 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))) {
      return {
        invalidEmail: true
      }
    }
    return null;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

