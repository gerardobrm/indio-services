export class CalendarEventPayload {
  id: string;
  siteTypeId: string;
  siteId: string;
  siteNumber: string;
  parkId: string;
  type: 'Reservation' | 'SiteHold';
  arrivalDate: string;
  departureDate: string;
  plannedArrivalTime: string;
  plannedDepartureTime: string;
  arrivalTime: null;
  departureTime: null;
  startTime: string;
  endTime: string;
  checkInTime: string;
  checkOutTime: string;
  guestFullName: string;
  confirmationNumber: string;
  status: string;
  notes: string;
  rateType: 'daily' | 'monthly';
  siteLocked: boolean;
  createdAt: string;
  updatedAt: string;
}
