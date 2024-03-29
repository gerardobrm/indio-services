import { PayloadBase } from './PayloadBase';

export class LocationsPayload extends PayloadBase {
  id: string
  parkId: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
};
