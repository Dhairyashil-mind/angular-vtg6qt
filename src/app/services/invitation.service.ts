import { Injectable } from '@angular/core';
import { EmailRequest } from '../models/invite.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor() { }

  public sendEmail(reqData: EmailRequest) {
    console.log("Request Data : ", reqData);
  }
}
