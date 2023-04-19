import { PayloadBase } from './PayloadBase';

export class MessagePayload extends PayloadBase {
  id: string;
  resourceId: string;
  resourceType: 'Guest' | 'Reservation'; // Polymorphic:  'Guest' or 'Reservation' for now.
  resourceName: string; // depends on resource type:  guestName or reservationNumber
  email: string;
  subject: string;
  body: string;
  date: string;
  status: 'sent' | 'received' | 'viewed' | 'bounced' | 'rejected';
  phone: string;
  opens: number;
  clicks: number;
  tags: string[];
  actions: string[]; // resend, new
};
