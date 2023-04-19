import { GuestPayload } from './GuestPayload';
import { PayloadBase } from './PayloadBase';

export class LongTermRequestPayload extends PayloadBase {
  id: string;
  parkId: string;
  siteTypeId: string;
  siteTypeName: string;
  guestSummary: GuestPayload;
  guestId: string;
  requestNum: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  pets: number;
  vehicleType: string;
  vehicleLengthRange: string;
  vehicleSlides: string[];
  vehicleTowing: string;
  vehicleElectrical: string[];
  action: string;
}

export const LongTermRequestPayloadAttributes = Object.keys(LongTermRequestPayload.new());
