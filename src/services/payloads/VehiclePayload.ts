import { PayloadBase } from './PayloadBase';

export class VehiclePayload extends PayloadBase {
  id: string
  guestId: string
  name: string
  primary?: boolean
  displayOrder?: number
  active?: boolean
  type: string
  lengthRange: string
  slides: string[]
  towing: string
  electrical: string[]
  length: string
  createdAt: string
  updatedAt: string
};

export const VehiclePayloadAttributes = Object.keys(VehiclePayload.new());
