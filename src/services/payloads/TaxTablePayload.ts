import { PayloadBase } from './PayloadBase';

export class TaxTablePayload extends PayloadBase {
  id: string;
  parkId: string;
  name: string;
  code: string;
  description: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const TaxTablePayloadAttributes = Object.keys(TaxTablePayload.new());
