export interface EmailRequest {
    emails: string[];
    subject: string;
    body: string;
}

export interface Email {
  id: string;
  valid?: boolean
}
