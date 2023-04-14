import { GuestPayload } from './GuestPayload';
import { PayloadBase } from './PayloadBase';
import { DiscountSummary, PaymentSummary, RateSummary, SiteSummary, TransactionSummary, VehicleSummary } from './ReservationPayload.extra';

export class ReservationPayload extends PayloadBase {
  id: string
  discountId: any
  rateId: string
  siteId: string
  guestId: string
  parkId: string
  parkName: string
  guestSummary: GuestPayload
  vehicleSummary: VehicleSummary
  siteSummary: SiteSummary
  rateSummary: RateSummary
  discountSummary: DiscountSummary
  transactionSummaries: TransactionSummary[]
  paymentSummaries: PaymentSummary[]
  arrivalDate: string
  departureDate: string
  numberOfNights: number
  guestCount: number
  adults: number
  children: number
  infants: number
  pets: number
  notes: string
  expiresAt: string
  source: string
  status: string
  siteStatus: string
  siteLocked: boolean
  rateType: string
  rateStrategy: string
  rateOverride: number
  discountCode: string
  longTerm: boolean
  longTermDays: number
  loyaltyNumber: string
  confirmationNumber: string
  total: number
  subtotal: number
  tax: number
  deposit: number
  transactionFee: number
  balance: number
  orderTotal: number
  paymentTotal: number
  paymentMethodId: string;   //missing in backend
  // paymentMethod: PaymentMethodPayload;   //missing in backend
  arrivalTime: string;
  plannedArrivalTime: string;
  departureTime: string;
  plannedDepartureTime: string;
  checkInTime: string;
  checkOutTime: string;
  actions: string[]
  specialRequests: string;
  type: 'Reservation' | 'SiteHold';
  createdAt: string
  updatedAt: string

  constructor() {
    super();
    const keys = Object.keys(this).filter(key => key.match(/\w+Summary$/));
    keys.forEach(key => this[key] = {});
  }
}

export class CreateReservationPayload extends PayloadBase {
  id: string;
  parkId: string;
  siteId: string;
  guestId: string;
  type: 'Reservation';
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  pets: number;
  siteLocked: boolean;
  vehicleType: string;
  vehicleLengthRange: string;
  vehicleSlides: string[];
  vehicleTowing: string;
  vehicleElectrical: string[];
  rateId: string;
  rateType: string;
  rateStrategy: string;
  rateOverride: number;
  updateRateCharges: boolean;
  discountId: string;
  discountCode: string;
  loyaltyNumber: string;
  paymentMethodId: string;
  paymentOverride?: number;
  checkNumber?: string;
  notes: string;
  action: string;
}

export class CreateReservationResponse extends CreateReservationPayload {
  siteHoldId: string;
  from: string;
  to: string;
  numberOfNights: number;
  guestCount: number;
  status: string;
  confirmationNumber: string;
  actions: string[];
  createdAt: string;
  updatedAt: string;
}

export type { DiscountSummary, PaymentSummary, RateSummary, SiteSummary, TransactionSummary, VehicleSummary };

export const CreateReservationPayloadAttributes = Object.keys(CreateReservationPayload.new());
