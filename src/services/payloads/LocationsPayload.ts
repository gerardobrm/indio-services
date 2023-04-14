import { PayloadBase } from './PayloadBase';

export class LocationsPayload extends PayloadBase {
  id: string
  parkId: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
};

export const LocationsPayloadAttributes = Object.keys(LocationsPayload.new());
