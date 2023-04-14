import { PayloadBase } from './PayloadBase';

export class GuestPayload extends PayloadBase {
  id: string
  parkId: string
  primaryPaymentMethodId: string
  firstName: string
  middleName: string
  lastName: string
  fullName: string
  title: string
  email: string
  email2: string
  phoneType: string
  phone: string
  formattedPhone: string
  phone2Type: string
  phone2: string
  formattedPhone2: string
  address: string
  address2: string
  address3: string
  address4: string
  city: string
  state: string
  postalCode: string
  country: string
  useMailingAsBilling: boolean
  billingAddress: string
  billingAddress2: string
  billingAddress3: string
  billingAddress4: string
  billingCity: string
  billingState: string
  billingPostalCode: string
  billingCountry: string
  notes: string
  idType: string
  idState: string
  idCountry: string
  idNumber: string
  nationality: string
  language: string
  birthday: string
  termsAccepted: boolean
  marketingOptIn: boolean
  privacyOptIn: boolean
  emailOptIn: boolean
  smsOptIn: boolean
  createdAt: string
  updatedAt: string
  vehicleType: string
  vehicleLengthRange: string
  vehicleSlides: string[]
  vehicleTowing: string
  vehicleElectrical: string[]
  vehicleLength?: string   // not used now
  mostRecentReservation?: {
    id: string,
    type: string,
    confirmationNumber: string,
    arrivalDate: string,
    departureDate: string,
    status: string,
    rateType: string,
  }
  outstandingBalance?: number
  lifetimeSpent?: number
}

export const GuestCreatePayloadAttributes = Object.keys(GuestPayload.new());
