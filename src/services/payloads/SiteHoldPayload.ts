import { PayloadBase } from './PayloadBase';

export class SiteHoldPayload extends PayloadBase {
  id: string
  parkId: string
  siteId: string
  siteTypeId: string
  creatorId: string
  guestId: string
  confirmationNumber: string
  type: 'SiteHold'
  holdType: string
  arrivalDate: string
  departureDate: string
  numberOfNights: number
  label: string
  notes: string
  source: string
  siteStatus: string
  status: string
  actions: string[]
}

export const SiteHoldPayloadAttributes = Object.keys(SiteHoldPayload.new());
